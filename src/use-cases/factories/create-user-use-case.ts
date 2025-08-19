import { PrismaUserRepository } from '@/repositories/prisma/users-repository'
import { CreateUserUseCase } from '../users/create-user-use-case'

export function makeCreateUserUserCase() {
  const usersRepository = new PrismaUserRepository()
  const useCase = new CreateUserUseCase(usersRepository)
  return useCase
}
