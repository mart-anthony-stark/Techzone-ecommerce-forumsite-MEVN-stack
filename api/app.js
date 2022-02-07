const fastify = require("fastify")({ logger: true });
const mongoose = require("mongoose");
require("dotenv").config({});

const port = process.env.PORT || 5000;
// CORS
fastify.register(require("fastify-cors"));
// routes
fastify.register(require("./routes/auth.route"));
fastify.register(require("./routes/product.route"));
fastify.register(require("./routes/post.route"));
fastify.register(require("./routes/order.route"));
fastify.register(require("./routes/cart.route"));

fastify.listen(port, async (e) => {
  if (e) return fastify.log.error(e);
  fastify.log.info(`Server started running at port ${port}`);

  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
    });
    fastify.log.info("Connected to database");
  } catch (e) {
    fastify.log.error(e);
    process.exit(1);
  }
});
