import { AuthenticateUserController } from '@/http/controller/authenticate/authentica-user-controller'
import { FastifyInstance } from 'fastify'

const authenticateUserController = new AuthenticateUserController()
export async function authenticateUserRoutes(app: FastifyInstance) {
  app.post('/authenticate', authenticateUserController.handle)
}
