import {
  CreateAccountProps,
  GetAccountByNameAndUserIdProps,
} from '@/@types/account'
import { BankAccount, TypeAccount } from '@prisma/client'

interface IAccountRepository {
  createAccount(data: CreateAccountProps): Promise<BankAccount>
  deleteAccount(accountId: string): Promise<any>
  getAccountsByUserId(userId: string): Promise<BankAccount[]>
  createAccountType(type: string): Promise<TypeAccount>
  getAccountByNameAndUserId(data: GetAccountByNameAndUserIdProps): Promise<any>
  countAccountsByUserId(userId: string): Promise<number>
  getAccountById(id: string): Promise<BankAccount | null>
}

export { IAccountRepository }
