const productController = require("../controllers/product.controller");

const { verifyTokenAndAdmin, verifyToken } = require("../utils/token");

const productRoutes = (fastify, options, done) => {
  fastify.get("/", productController.getAllProducts);
  fastify.get("/:id", productController.getProductById);
  fastify.post("/", verifyTokenAndAdmin, productController.createProduct);
  fastify.put("/:id", verifyTokenAndAdmin, productController.updateProduct);
  fastify.delete("/:id", verifyTokenAndAdmin, productController.deleteProduct);
  done();
};

module.exports = productRoutes;
