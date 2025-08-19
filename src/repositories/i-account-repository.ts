import { CreateAccountProps } from '@/@types/account'
import { BankAccount } from '@prisma/client'

interface IAccountRepository {
  createAccount(data: CreateAccountProps): Promise<BankAccount>
  getAccountsByUserId(userId: string): Promise<BankAccount[]>
}

export { IAccountRepository }
