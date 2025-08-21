import { GoalErrors } from '@/use-cases/errors/goals-error'
import { makeCreateGoalUseCase } from '@/use-cases/factories/create-goal-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

class CreateGoalController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const createGoalUseCase = makeCreateGoalUseCase()
    const createGoalBodySchema = z.object({
      userId: z.string(),
      title: z.string(),
      description: z.string().optional(),
      targetAmout: z.number(),
      currentAmount: z.number(),
      finalTime: z.coerce.date(),
    })

    const {
      userId,
      title,
      description,
      targetAmout,
      currentAmount,
      finalTime,
    } = createGoalBodySchema.parse(request.body)

    try {
      const result = await createGoalUseCase.execute({
        userId,
        title,
        description,
        targetAmout,
        currentAmount,
        finalTime,
      })
      return reply.status(200).send(result)
    } catch (error: any) {
      if (error instanceof GoalErrors) {
        return reply
          .status(error.errorCode)
          .send({ errorType: error.error, message: error.message })
      }
    }
  }
}

export { CreateGoalController }
