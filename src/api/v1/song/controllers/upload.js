const { getAudioDuration, processToOgg, processToHls } = require("../../../../queues/audioProcessor");
const songService = require("../../../../lib/song");
const upload = async (req, res, next) => {
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
  const response = {
    message: "Song uploaded successfully.",
    song_data: {
      ...result,
    },
    links: {
      self: `/songs/${result._id}`,
    },
  };
  res.status(201).json(response);
  processToHls(req.file.path,`./uploads/hls_output`)
};

module.exports = upload;
