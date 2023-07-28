import {type FastifyPluginAsync} from 'fastify';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const test: FastifyPluginAsync = async (fastify, options): Promise<void> => {
  fastify.get('/async-iterator', async (request, reply) => {
    reply.sse((async function * source () {
      for (let i = 0; i < 10; i++) {
        await sleep(100);
        yield {id: String(i), data: "Some message"};
      }
    })());
  });

  fastify.get('/single-events', async (request, reply) => {
    for (let i = 0; i < 10; i++) {
      await sleep(100);
      reply.sse({id: String(i), data: "Some message"});
    }

    request.socket.on("close", () => {
      console.log("connection closed");
    });
  });


  fastify.get('/events', async (request, reply) => {
    for (let i = 0; i < 10; i++) {
      await sleep(100);
      reply.sse({ data: "Some message" });
    }
    reply.sse({ event: "close" });

    request.socket.on("close", () => {
      console.log("connection closed");
    });
  });
};

export default test;
