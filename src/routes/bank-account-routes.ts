import { CreateBankAccountController } from '@/http/controller/account/create-bank-account-controller'
import { DeleteBankAccountController } from '@/http/controller/account/delete-bank-account-controller'
import { FastifyInstance } from 'fastify'

const createBankAccountController = new CreateBankAccountController()
const deleteBankAccountController = new DeleteBankAccountController()
export async function BankAccountRoutes(app: FastifyInstance) {
  app.post('/account/create', createBankAccountController.handle)
  app.delete('/account/delete', deleteBankAccountController.handle)
}
