import { PrismaAccountRepository } from '@/repositories/prisma/account-repository'
import { DeleteBankAccountUseCase } from '../account/delete-bank-account-use-case'
import { PrismaCardRepository } from '@/repositories/prisma/card-repository'

export function makeDeleteBankAccountUseCase() {
  const accountRepository = new PrismaAccountRepository()
  const cardRepository = new PrismaCardRepository()
  const useCase = new DeleteBankAccountUseCase(
    accountRepository,
    cardRepository
  )
  return useCase
}
