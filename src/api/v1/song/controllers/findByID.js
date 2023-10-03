const songService = require("../../../../lib/song");
const findByID = async (req, res, next) => {
  const expand = req.query.expand || "";
  const id = req.params.id;

  try {
    const song = await songService.findByID({ id, expand });
    const response = {
      message: "Success",
      song_data: song,
      links: {
        self: `/songs/${song._id}`,
      },
    };
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = findByID;
