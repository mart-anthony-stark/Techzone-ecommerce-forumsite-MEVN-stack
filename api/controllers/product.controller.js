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

const updateProduct = async (req, reply) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body }
    );
    reply.code(200).send(updatedProduct);
  } catch (error) {
    reply.code(500).send({ error });
  }
};

const deleteProduct = async (req, reply) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    reply.code(200).send(deleted);
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
