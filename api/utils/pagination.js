const paginate = (model) => {
  return async (req, reply, next) => {
    req.paginated = "asd";
    next();
  };
};

module.exports = paginate;
