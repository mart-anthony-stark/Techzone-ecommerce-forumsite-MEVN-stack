const Koa = require("koa");
const router = require("./routes");
const koaBody = require("koa-body");
const mongoose = require("mongoose");
require("dotenv").config({});

const port = process.env.PORT || 5000;

const app = new Koa();

// middlewares
app.use(koaBody({ multipart: true }));
app.use(router());

app.listen(port, async (e) => {
  if (e) return console.log(e);
  console.log(`Server started running at port ${port}`);

  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
    });
    console.log("Connected to database");
  } catch (e) {
    console.log(e);
  }
});
