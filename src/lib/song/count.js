const defaults = require("../../config/defaults");
const Song = require("../../models/Song");

const count = ({ search = defaults.search }) => {
    const filter = {
      title: { $regex: search, $options: "i" },
    };
    return Song.count(filter);
  };
  

  module.exports = count