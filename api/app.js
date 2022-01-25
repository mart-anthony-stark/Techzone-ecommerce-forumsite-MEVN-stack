const Koa = require("koa");
const router = require("./routes");

const port = process.env.PORT || 5000;

const app = new Koa();

// middlewares
app.use(router());

app.listen(port, (e) => {
  if (e) return console.log(e);
  console.log(`Server started running at port ${port}`);
});
