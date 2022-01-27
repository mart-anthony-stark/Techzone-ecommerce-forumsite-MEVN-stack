const Product = require("../models/Product.model");

const getAllProducts = async (ctx) => {
  try {
    const queryCategory = ctx.request.query.category;
    let products;

    if (queryCategory) {
      products = await Product.find({ category: queryCategory });
    } else {
      products = await Product.find();
    }
    ctx.status = 200;
    ctx.body = { products };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error };
  }
};

const getProductById = async (ctx) => {
  try {
    const product = await Product.findById(ctx.request.params.id);
    ctx.status = 200;
    ctx.body = { product };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error };
  }
};

const createProduct = async (ctx) => {
  try {
    const product = await new Product(ctx.request.body).save();
    ctx.body = { product };
    ctx.status = 200;
    console.log("the response status is ", ctx.status);
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = { error };
  }
};

const updateProduct = async (ctx) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      {
        _id: ctx.request.params.id,
      },
      { $set: ctx.request.body }
    );
    ctx.response.body = { updatedProduct };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error };
  }
};

const deleteProduct = async (ctx) => {
  try {
    const deleted = await Product.findByIdAndDelete(ctx.request.params.id);
    ctx.body = { deleted };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error };
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
