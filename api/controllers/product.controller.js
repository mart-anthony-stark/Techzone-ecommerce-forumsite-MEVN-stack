const Product = require("../models/Product.model");

const getAllProducts = async (req, reply) => {
  try {
    const queryCategory = req.query.category;
    let products;

    if (queryCategory) {
      products = await Product.find({ category: queryCategory });
    } else {
      products = await Product.find();
    }
    reply.code(200).send(products);
  } catch (error) {
    reply.code(500).send({ error });
  }
};

const getProductById = async (req, reply) => {
  try {
    const product = await Product.findById(req.params.id);
    reply.code(200).send(product);
  } catch (error) {
    reply.code(500).send({ error });
  }
};

const createProduct = async (req, reply) => {
  try {
    const product = await new Product(req.body).save();
    reply.code(200).send(product);
  } catch (error) {
    console.log(error);
    reply.code(500).send({ error });
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
    reply.code(500).send({ error });
  }
};

const deleteProduct = async (ctx) => {
  try {
    const deleted = await Product.findByIdAndDelete(ctx.request.params.id);
    ctx.body = { deleted };
  } catch (error) {
    reply.code(500).send({ error });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
