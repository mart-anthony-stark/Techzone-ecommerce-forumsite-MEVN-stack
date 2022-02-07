const paginate = (model, { populate }) => {
  return async (req, reply, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    try {
      results.result = populate
        ? await model.find().limit(limit).skip(startIndex).populate(populate)
        : await model.find().limit(limit).skip(startIndex);
      req.results = results;
      next();
    } catch (err) {
      reply.code(500).send({ message: err.message });
    }
  };
};

module.exports = paginate;
