const defaults = require("../../../../config/defaults");
const songService = require("../../../../lib/song");
const { getPagination, getHateAOS } = require("../../../../utils/query");
const transformData = require("../../../../utils/transformData");
const findAll = async (req, res, next) => {
  const page = req.query.page || defaults.page;
  const limit = req.query.limit || defaults.limit;
  const sortType = req.query.sort_type || defaults.sortType;
  const sortBy = req.query.sort_by || defaults.sortBy;
  const search = req.query.search || defaults.search;
  try {
    const songs = await songService.findAll({
      page,
      limit,
      sortBy,
      sortType,
      search,
    });
    const data = transformData(
      songs,
      ["_id",
        "title",
        "artist",
        "cover",
        "status",
        "category",
        "updatedAt",
        "createdAt",
        "durationInSeconds",
        "originalName",
        "audioLink",
        "processedPath",
      ],
      { link: `/songs/{_id}` }
    );

    //pagination
    const totalItems = await songService.count({ search });

    const pagination = getPagination({ totalItems, limit, page });

    //HATEOS links
    const links = getHateAOS({
      url: req.url,
      path: req.path,
      query: req.query,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
      page,
    });
    return res.status(200).json({ data, pagination, links });
  } catch (err) {
    next(err);
  }
};

module.exports = findAll;
