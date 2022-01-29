const Post = require("../models/Post.model");

module.exports = {
  getAllPosts: async (req, reply) => {
    try {
      const posts = await Post.find();
      reply.send(posts);
    } catch (error) {
      reply.code(500).send({ error });
    }
  },
};
