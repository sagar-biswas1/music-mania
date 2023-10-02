const ffmpeg = require('fluent-ffmpeg');

const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const ffprobeInstaller = require("@ffprobe-installer/ffprobe");
ffmpeg.setFfprobePath(ffprobeInstaller.path);

function getAudioDuration(audioFilePath) {

return new Promise(function(resolve, reject) {

    ffmpeg.ffprobe(audioFilePath, (err, metadata) => {
        if (err) {
            reject(err) ;
        } else {
          const durationInSeconds = metadata.format.duration;
          resolve( {durationInSeconds});
        }
      });
})


  }

  module.exports = {getAudioDuration}
  