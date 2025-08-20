import { BankAccount, TypeAccount } from '@prisma/client'
import { IAccountRepository } from '../i-account-repository'
import { prisma } from '@/lib/prisma'
import {
  CreateAccountProps,
  GetAccountByNameAndUserIdProps,
} from '@/@types/account'
import { DeleteBankAccountController } from '@/http/controller/account/delete-bank-account-controller'

class PrismaAccountRepository implements IAccountRepository {
  async createAccount(data: CreateAccountProps): Promise<BankAccount> {
    const account = await prisma.bankAccount.create({
      data: {
        userId: data.userId,
        accountName: data.accountName,
        accountType: data.accountType,
        bankBalance: data.bankBalance,
      },
    })
    return account
  }

  async deleteAccount(accountId: string): Promise<any> {
    const account = await prisma.bankAccount.delete({
      where: {
        id: accountId,
      },
    })
    return account
  }
  async getAccountsByUserId(userId: string): Promise<BankAccount[]> {
    const accounts = await prisma.bankAccount.findMany({
      where: {
        userId,
      },
    })
    return accounts
  }

  async getAccountById(id: string): Promise<BankAccount | null> {
    const account = await prisma.bankAccount.findUnique({
      where: {
        id: id,
      },
    })
    return account
  }

  async createAccountType(type: string): Promise<TypeAccount> {
    const typeAccount = await prisma.typeAccount.create({
      data: { type: type },
    })
    return typeAccount
  }

  async getAccountByNameAndUserId(data: GetAccountByNameAndUserIdProps) {
    const account = await prisma.bankAccount.findFirst({
      where: {
        userId: data.userId,
        accountName: data.accountName,
      },
    })
    return account
  }
  async countAccountsByUserId(userId: string): Promise<number> {
    const count = await prisma.bankAccount.count({
      where: {
        userId,
      },
    })
    return count
  }
}
export { PrismaAccountRepository }
