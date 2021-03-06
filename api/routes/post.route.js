const postController = require("../controllers/post.controller");
const PostModel = require("../models/Post.model");

const { verifyToken } = require("../utils/token");
const paginate = require("../utils/pagination");

const postRoutes = (fastify, options, done) => {
  fastify.get("/posts", postController.getAllPosts);
  fastify.get(
    "/posts/paginated",
    { preHandler: [paginate(PostModel, { populate: ["author"] })] },
    postController.getPaginated
  );
  fastify.get("/posts/:id", postController.getPostById);
  fastify.post(
    "/posts/create",
    { preHandler: [verifyToken] },
    postController.createPost
  );
  fastify.put(
    "/posts/:id",
    { preHandler: [verifyToken] },
    postController.updatePost
  );
  fastify.delete(
    "/posts/:id",
    { preHandler: [verifyToken] },
    postController.deletePost
  );

  done();
};

module.exports = postRoutes;
