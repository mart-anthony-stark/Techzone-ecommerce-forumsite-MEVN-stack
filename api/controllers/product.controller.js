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
    const product = new Product(ctx.request.body);
    await product.save();
    ctx.status = 200;
    ctx.body = { product };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error };
  }
};

module.exports = { getAllProducts, getProductById, createProduct };
