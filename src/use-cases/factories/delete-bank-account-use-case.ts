import { PrismaAccountRepository } from '@/repositories/prisma/account-repository'
import { DeleteBankAccountUseCase } from '../account/delete-bank-account-use-case'

export function makeDeleteBankAccountUseCase() {
  const accountRepository = new PrismaAccountRepository()
  const useCase = new DeleteBankAccountUseCase(accountRepository)
  return useCase
}
