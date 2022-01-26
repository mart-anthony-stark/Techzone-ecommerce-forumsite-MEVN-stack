const combineRouters = require("koa-combine-routers");
const rootRouter = require("./root.route");
const authRouter = require("./auth.route");

const router = combineRouters(rootRouter, authRouter);

module.exports = router;
