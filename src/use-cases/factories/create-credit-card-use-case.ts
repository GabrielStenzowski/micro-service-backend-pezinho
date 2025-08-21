import { PrismaCardRepository } from '@/repositories/prisma/card-repository'
import { CreateCreditCardUseCase } from '../card/create-credit-card-use-case'

export function makeCreateCreditCardUseCase() {
  const cardRepository = new PrismaCardRepository()
  const useCase = new CreateCreditCardUseCase(cardRepository)
  return useCase
}
