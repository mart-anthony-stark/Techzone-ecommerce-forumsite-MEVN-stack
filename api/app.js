const fastify = require("fastify")({ logger: true });

const mongoose = require("mongoose");
require("dotenv").config({});

const port = process.env.PORT || 5000;

// middlewares

fastify.listen(port, async (e) => {
  if (e) return console.log(e);
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
