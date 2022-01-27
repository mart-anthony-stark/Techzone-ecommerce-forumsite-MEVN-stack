const combineRouters = require("koa-combine-routers");
const rootRouter = require("./root.route");
const authRouter = require("./auth.route");
const productRouter = require("./product.route");

const router = combineRouters([rootRouter, authRouter, productRouter]);

module.exports = router;
