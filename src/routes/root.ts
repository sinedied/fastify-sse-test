import {type FastifyPluginAsync} from 'fastify';

const root: FastifyPluginAsync = async (fastify, options): Promise<void> => {
  fastify.get('/', async (request, reply) => ({root: true}));
};

export default root;
