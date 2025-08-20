import { AccountErrors } from '@/use-cases/errors/account-error'
import { makeDeleteBankAccountUseCase } from '@/use-cases/factories/delete-bank-account-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

class DeleteBankAccountController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const deleteBankAccountUseCase = makeDeleteBankAccountUseCase()
    const deleteBankAccountBodySchema = z.object({
      userId: z.string(),
      accountId: z.string(),
    })

    const { userId, accountId } = deleteBankAccountBodySchema.parse(
      request.body
    )
    try {
      const result = await deleteBankAccountUseCase.execute({
        userId,
        accountId,
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

export { DeleteBankAccountController }
