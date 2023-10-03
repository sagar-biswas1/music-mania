const Song = require("../../models/Song");
const defaults = require("../../config/defaults");
const findAll = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortType,
  search = defaults.search,
}) => {
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
  const filter = {
    title: { $regex: search, $options: "i" },
  };

  const songs = await Song.find(filter)
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  return songs.map((song) => ({ ...song._doc }));
};

module.exports = findAll;
