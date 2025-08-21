import { PrismaCardRepository } from '@/repositories/prisma/card-repository'
import { CreateDebitCardUseCase } from '../card/create-debit-card-use-case'
import { PrismaAccountRepository } from '@/repositories/prisma/account-repository'

export function makeCreateDebitCardUseCase() {
  const cardRepository = new PrismaCardRepository()
  const accountRepository = new PrismaAccountRepository()
  const useCase = new CreateDebitCardUseCase(cardRepository, accountRepository)
  return useCase
}
