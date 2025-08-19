import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export async function healthRoute(app: FastifyInstance) {
  app.get('/health', async (request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(200).send('OK')
  })
}
