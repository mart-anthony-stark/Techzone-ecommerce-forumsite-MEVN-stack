const postRoutes = (fastify, options, done) => {
  fastify.get("/posts", (req, reply) => {
    reply.send("Posts");
  });
  done();
};

module.exports = postRoutes;
