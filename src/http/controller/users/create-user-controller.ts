import { TypeGender } from '@/@types/user'
import { UsersErrors } from '@/use-cases/errors/users-errror'
import { makeCreateUserUserCase } from '@/use-cases/factories/create-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

class CreateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const createUserUseCase = makeCreateUserUserCase()

    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
      dateOfBirth: z.coerce.date(),
      gender: z.nativeEnum(TypeGender),
    })
    const { name, email, password, dateOfBirth, gender } =
      createUserBodySchema.parse(request.body)
    try {
      const result = await createUserUseCase.execute({
        name,
        email,
        password,
        dateOfBirth,
        gender,
      })

      return reply.status(result.successCode).send({
        successType: result.success,
        message: result.sucessMessage,
      })
    } catch (error: any) {
      if (error instanceof UsersErrors) {
        return reply
          .status(error.errorCode)
          .send({ errorType: error.error, message: error.message })
      }
    }
  }
}
export { CreateUserController }
