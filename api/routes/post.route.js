const postController = require("../controllers/post.controller");

const { verifyToken } = require("../utils/token");
const postRoutes = (fastify, options, done) => {
  fastify.get("/posts", postController.getAllPosts);
  fastify.get("/posts/:id", postController.getPostById);
  fastify.post(
    "/posts",
    { preHandler: [verifyToken] },
    postController.createPost
  );
  done();
};

module.exports = postRoutes;
