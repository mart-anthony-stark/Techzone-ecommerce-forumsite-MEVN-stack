const Router = require("@koa/router");
const router = new Router({ prefix: "/auth" });
const authController = require("../controllers/auth.controller");

router.post("/login", authController.login);
router.post("/signup", authController.signup);

module.exports = router;
