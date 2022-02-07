const paginate = async (req, model) => {
  try {
    const paginated = await model.find();
    return paginated;
  } catch (error) {
    console.log(error);
  }
  return "sd";
};

module.exports = paginate;
