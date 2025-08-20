import { AccountErrors } from '@/use-cases/errors/account-error'
import { UsersErrors } from '@/use-cases/errors/users-errror'
import { makeCreateBankAccountUseCase } from '@/use-cases/factories/create-bank-account-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

class CreateBankAccountController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const createBankAccountUseCase = makeCreateBankAccountUseCase()

    const createBankAccountBodySchema = z.object({
      userId: z.string(),
      accountName: z.string(),
      accountType: z.string(),
      bankBalance: z.number(),
    })

    const { userId, accountName, accountType, bankBalance } =
      createBankAccountBodySchema.parse(request.body)

    try {
      const result = await createBankAccountUseCase.execute({
        userId,
        accountName,
        accountType,
        bankBalance,
      })

      return reply.status(result.successCode).send({
        successType: result.success,
        message: result.sucessMessage,
      })
    } catch (error: any) {
      if (error instanceof AccountErrors) {
        return reply
          .status(error.errorCode)
          .send({ errorType: error.error, message: error.message })
      }
    }
  }
}

export { CreateBankAccountController }
