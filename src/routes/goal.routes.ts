import { CreateGoalController } from '@/http/controller/goals/create-goal-controller'
import { FastifyInstance } from 'fastify'

const createGoalController = new CreateGoalController()

export async function goalRoutes(app: FastifyInstance) {
  app.post('/goal/create', createGoalController.handle)
}
