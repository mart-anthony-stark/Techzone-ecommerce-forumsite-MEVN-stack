const productController = require("../controllers/product.controller");

const { verifyAdmin, verifyToken } = require("../utils/token");

const productRoutes = (fastify, options, done) => {
  fastify.get("/products", productController.getAllProducts);
  fastify.get("/products/:id", productController.getProductById);
  fastify.post(
    "/products",
    { preHandler: [verifyToken, verifyAdmin] },
    productController.createProduct
  );
  fastify.put(
    "/products/:id",
    { preHandler: [verifyToken, verifyAdmin] },
    productController.updateProduct
  );
  fastify.delete(
    "/products/:id",
    { preHandler: [verifyToken, verifyAdmin] },
    productController.deleteProduct
  );
  done();
};

module.exports = productRoutes;
