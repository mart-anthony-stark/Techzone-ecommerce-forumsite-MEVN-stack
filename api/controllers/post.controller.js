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

  getPostById: async (req, reply) => {
    try {
      const post = await Post.find({ _id: req.params.id });
      reply.code(200).send(post);
    } catch (error) {
      reply.code(500).send({ error });
    }
  },

  createPost: async (req, reply) => {
    try {
      const post = await Post.find({ _id: req.params.id });
      reply.code(200).send(post);
    } catch (error) {
      reply.code(500).send({ error });
    }
  },
};
