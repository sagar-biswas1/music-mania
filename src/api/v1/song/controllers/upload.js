const { getAudioDuration } = require("../../../../queues/audioProcessor");

const upload = async (req, res, next) => {
  console.log("hello",req.body,req.file);
  const getDuration= await getAudioDuration(`./${req.file.path}`)
  console.log("getDuration",getDuration)
//   const { title, artist, cover, status, category } = req.body;

//   console.log({ title, artist, cover, status, category });
};

module.exports = upload;
