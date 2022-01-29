const postController = require("../controllers/post.controller");

const postRoutes = (fastify, options, done) => {
  fastify.get("/posts", postController.getAllPosts);
  done();
};

module.exports = postRoutes;
