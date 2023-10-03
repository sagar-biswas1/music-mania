const {
  getAudioDuration,
  processToOgg,
  processToHls,
} = require("../../../../queues/audioProcessor");
const songService = require("../../../../lib/song");
const upload = async (req, res, next) => {
  try {
    const getDuration = await getAudioDuration(`./${req.file.path}`);

    const { title, artist, cover, status, category } = req.body;
    const dbPayload = {
      title,
      artist,
      cover,
      status,
      category,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      audioLink: req.file.path,
      durationInSeconds: getDuration.durationInSeconds,
      uploadedBy: "651aa1203ebfcf4ba6b30bb1",
    };

    const result = await songService.upload(dbPayload);
    //todo : handle processToHls in the background after sending response
    //while processed notify user using websocket connection
    const { processedPath } = await processToHls(
      req.file.path,
      `./uploads/hls_output`
    );

    if (!processedPath) {
      return res
        .status(500)
        .json({ message: "Couldn't process uploaded file" });
    }
    const response = {
      message: "Song uploaded successfully ...",
      song_data: {
        ...result,
        processedPath,
      },
      links: {
        self: `/songs/${result._id}`,
      },
    };

    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = upload;
