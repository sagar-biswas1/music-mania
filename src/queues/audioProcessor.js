const ffmpeg = require("fluent-ffmpeg");

const path = require("path");
const fs = require("fs");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const ffprobeInstaller = require("@ffprobe-installer/ffprobe");
ffmpeg.setFfprobePath(ffprobeInstaller.path);

function getAudioDuration(audioFilePath) {
  return new Promise(function (resolve, reject) {
    ffmpeg.ffprobe(audioFilePath, (err, metadata) => {
      if (err) {
        reject(err);
      } else {
        const durationInSeconds = metadata.format.duration;
        resolve({ durationInSeconds });
      }
    });
  });
}

const processToOgg = (inputFilePath, outputFolder) => {
  const fileExt = path.extname(inputFilePath);
  const fileNameWithoutExt = path.basename(inputFilePath, fileExt);

  const outputFilePath = `${outputFolder}/${fileNameWithoutExt}.ogg`;
  console.log(fileExt, fileNameWithoutExt, outputFilePath);
  ffmpeg()
    .input(inputFilePath)
    .audioCodec("libvorbis") // Set the audio codec to libvorbis for Ogg Vorbis format
    .output(outputFilePath)
    .on("end", () => {
      console.log("Conversion finished.");
    })
    .on("error", (err) => {
      console.error("Error:", err);
    })
    .run();
};

const bitrates = [128, 64, 32];
const processToHls = (inputFilePath, outputFolder) => {
  const fileExt = path.extname(inputFilePath);
  const fileNameWithoutExt = path.basename(inputFilePath, fileExt);

  const outputFilePath = `${outputFolder}/${fileNameWithoutExt}.m3u8`;
  // const outputFilePath = path.join(outputFolder, `segment_${index}.m4s`)
  // console.log({inputFilePath})

  return new Promise(function (resolve, reject) {
    ffmpeg()
      .input(inputFilePath)
      .inputFormat("mp3")
      .videoCodec("copy") // No video codec
      .audioCodec("aac") // AAC audio codec for HLS
      .addOption("-hls_time", "3") // Set segment duration to 3 seconds (adjust as needed)
      .addOption("-hls_list_size", "0") // Generate an indefinite playlist
      .addOption(
        "-hls_segment_filename",
        `${outputFolder}/${fileNameWithoutExt}_%02d.ts`
      ) // Set segment filenames
      .addOption("-hls_allow_cache", "1") // Allow caching on the client-side
      .output(outputFilePath)
      .on("end", () => {
        console.log("Conversion finished.");
        resolve({ processedPath: outputFilePath });
      })
      .on("error", (err) => {
        console.error("Error:", err);
      })
      .run();
  });
};
module.exports = { getAudioDuration, processToOgg, processToHls };
