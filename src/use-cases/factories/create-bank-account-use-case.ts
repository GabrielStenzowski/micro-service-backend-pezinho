import { PrismaAccountRepository } from '@/repositories/prisma/account-repository'
import { CreateBankAccountUseCase } from '../account/create-bank-account-use-case'

export function makeCreateBankAccountUseCase() {
  const accountRepository = new PrismaAccountRepository()
  const useCase = new CreateBankAccountUseCase(accountRepository)
  return useCase
}
