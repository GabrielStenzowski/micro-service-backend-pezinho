import { PrismaCardRepository } from '@/repositories/prisma/card-repository'
import { DeleteCardUseCase } from '../card/delete-card-use-case'

export function makeDeleteCardUseCase() {
  const cardRepository = new PrismaCardRepository()
  const useCase = new DeleteCardUseCase(cardRepository)
  return useCase
}
