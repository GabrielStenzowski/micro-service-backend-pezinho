import { CardType } from '@/@types/card'
import { CardErrors } from '@/use-cases/errors/card-errors'
import { makeCreateCreditCardUseCase } from '@/use-cases/factories/create-credit-card-use-case'
import { makeCreateDebitCardUseCase } from '@/use-cases/factories/create-debit-card-use-case'

import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

class CreateCardController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const createCreditCardUseCase = makeCreateCreditCardUseCase()
    const createDebitCardUseCase = makeCreateDebitCardUseCase()
    const createCardBodySchema = z.object({
      userId: z.string(),
      accountId: z.string().optional(),
      cardName: z.string(),
      cardType: z.nativeEnum(CardType),
      limitAmount: z.number().optional(),
      currentBalance: z.number().optional(),
      dueDate: z.number().optional(),
    })

    const {
      userId,
      accountId,
      cardName,
      cardType,
      limitAmount,
      currentBalance,
      dueDate,
    } = createCardBodySchema.parse(request.body)

    try {
      if (cardType === 'CREDIT') {
        const result = await createCreditCardUseCase.execute({
          userId,
          accountId,
          cardName,
          cardType,
          limitAmount,
          currentBalance,
          dueDate,
        })
        return reply.status(result.successCode).send({
          successType: result.success,
          message: result.sucessMessage,
        })
      }
      if (cardType === 'DEBIT') {
        const result = await createDebitCardUseCase.execute({
          userId,
          accountId,
          cardName,
          cardType,
          limitAmount,
          currentBalance,
          dueDate,
        })
        return reply.status(result.successCode).send({
          successType: result.success,
          message: result.sucessMessage,
        })
      }
    } catch (error: any) {
      if (error instanceof CardErrors) {
        return reply
          .status(error.errorCode)
          .send({ errorType: error.error, errorMessage: error.errorMessage })
      }
    }
  }
}

export { CreateCardController }
