const Post = require("../models/Post.model");

module.exports = {
  getPaginated: async (req, reply) => {
    let populatedRes = req.results;
    populatedRes.result.forEach((post) => (post.author.password = undefined));
    reply.code(200).send(populatedRes);
  },
  getAllPosts: async (req, reply) => {
    try {
      const posts = await Post.find().populate("author");
      posts.forEach((post) => {
        post.author.password = undefined;
      });
      reply.status(200).send(posts);
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
      const { title, body } = req.body;
      const post = await new Post({
        author: req.user._id,
        title,
        body,
      }).save();
      reply.code(200).send(post);
    } catch (error) {
      reply.code(500).send({ error });
    }
  },

  deletePost: async (req, reply) => {
    try {
      const post = await Post.findOneAndRemove({
        author: req.user._id,
        _id: req.params.id,
      });
      reply.code(200).send(post);
    } catch (error) {
      console.log(error);
      reply.code(500).send({ error });
    }
  },

  updatePost: async (req, reply) => {
    if (req.body.author) req.body.author = undefined;
    try {
      const updatedPost = await Post.findOneAndUpdate(
        {
          author: req.user._id,
          _id: req.params.id,
        },
        { $set: req.body },
        { new: true }
      );
      reply.code(200).send(updatedPost);
    } catch (error) {
      reply.code(500).send({ error });
    }
  },
};
