import { CreateUserController } from '@/http/controller/users/create-user-controller'
import { FastifyInstance } from 'fastify'

const createUserController = new CreateUserController()
export async function userRoutes(app: FastifyInstance) {
  app.post('/users/create', createUserController.handle)
}
