const combineRouters = require("koa-combine-routers");
const rootRouter = require("./root.router");

const router = combineRouters(rootRouter);

module.exports = router;
