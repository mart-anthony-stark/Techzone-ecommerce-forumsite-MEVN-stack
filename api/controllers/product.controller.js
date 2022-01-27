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
    
};
