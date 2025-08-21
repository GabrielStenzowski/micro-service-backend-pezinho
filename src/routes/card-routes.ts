import { CreateCardController } from '@/http/controller/card/create-card-controller'
import { DeleteCardController } from '@/http/controller/card/delete-card-controller'
import { FastifyInstance } from 'fastify'

const createCardController = new CreateCardController()
const deleteCardController = new DeleteCardController()
export async function cardRoutes(app: FastifyInstance) {
  app.post('/card/create', createCardController.handle)
  app.delete('/card/delete', deleteCardController.handle)
}
