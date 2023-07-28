import fp from 'fastify-plugin'
import { FastifySSEPlugin } from "fastify-sse-v2";

export default fp(async (fastify) => {
  fastify.register(FastifySSEPlugin);
});
