const Router = require("@koa/router");
const router = new Router({ prefix: "/products" });
const productController = require("../controllers/product.controller");

const { verifyTokenAndAdmin, verifyToken } = require("../utils/token");

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", verifyTokenAndAdmin, productController.createProduct);
router.put("/:id", verifyTokenAndAdmin, productController.updateProduct);

module.exports = router;
