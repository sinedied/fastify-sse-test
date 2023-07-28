import {type FastifyPluginAsync} from 'fastify';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const test: FastifyPluginAsync = async (fastify, options): Promise<void> => {
  fastify.get('/async-iterator', async (request, reply) => {
    reply.sse((async function * source () {
      for (let i = 0; i < 10; i++) {
        await sleep(1000);
        yield {id: String(i), data: "Some message"};
      }
    })());
  });

  fastify.get('/single-events', async (request, reply) => {
    for (let i = 0; i < 10; i++) {
      await sleep(1000);
      reply.sse({id: String(i), data: "Some message"});
    }
  });
};

export default test;
