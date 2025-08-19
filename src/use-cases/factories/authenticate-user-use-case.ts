import { PrismaUserRepository } from '@/repositories/prisma/users-repository'
import { AuthenticateUserUseCase } from '../authenticate/authenticate-user-use-case'

export function makeAuthenticateUserUseCase() {
  const userRepository = new PrismaUserRepository()
  const useCase = new AuthenticateUserUseCase(userRepository)
  return useCase
}
