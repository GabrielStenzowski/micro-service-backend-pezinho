import { env } from '@/env'
import { makeAuthenticateUserUseCase } from '@/use-cases/factories/authenticate-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

class AuthenticateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const authenticaseUserUseCase = makeAuthenticateUserUseCase()

    const authenticaseUserBodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
    })

    const { email, password } = authenticaseUserBodySchema.parse(request.body)

    try {
      const authenticated = await authenticaseUserUseCase.execute({
        email,
        password,
      })

      if (authenticated !== null) {
        const token = await reply.jwtSign(
          {
            user: authenticated.sucessMessage,
          },
          { expiresIn: env.EXPERES_IN_TOKEN }
        )
        const refreshToken = await reply.jwtSign(
          { user: authenticated.sucessMessage },
          { expiresIn: env.EXPERES_IN_REFRESH_TOKEN }
        )
        return reply.status(200).send({
          message: { token, refreshToken },
        })
      }

      return reply.status(400).send({ message: 'Credential invalid' })
    } catch (error: any) {
      return reply.status(400).send(error)
      // if (error instanceof Error) {
      //   return reply.status(error.errorCode).send({ errorType: error.error })
      // }
    }
  }
}
export { AuthenticateUserController }
