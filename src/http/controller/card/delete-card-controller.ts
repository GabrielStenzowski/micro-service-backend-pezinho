import { CardType } from '@/@types/card'
import { CardErrors } from '@/use-cases/errors/card-errors'
import { makeDeleteCardUseCase } from '@/use-cases/factories/delete-card-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

class DeleteCardController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const deleteCardUseCase = makeDeleteCardUseCase()
    const deleteCardBodySchema = z.object({
      userId: z.string(),
      cardId: z.string(),
      cardType: z.nativeEnum(CardType),
    })
    const { userId, cardId, cardType } = deleteCardBodySchema.parse(
      request.body
    )
    try {
      const result = await deleteCardUseCase.execute({
        userId,
        cardId,
        cardType,
      })
      return reply.status(result.successCode).send({
        successType: result.success,
        message: result.sucessMessage,
      })
    } catch (error: any) {
      if (error instanceof CardErrors) {
        return reply
          .status(error.errorCode)
          .send({ errorType: error.error, message: error.message })
      }
    }
  }
}
export { DeleteCardController }
