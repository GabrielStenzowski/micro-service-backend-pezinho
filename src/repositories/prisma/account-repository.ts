import { BankAccount } from '@prisma/client'
import { IAccountRepository } from '../i-account-repository'
import { prisma } from '@/lib/prisma'
import { CreateAccountProps } from '@/@types/account'

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
  async getAccountsByUserId(userId: string): Promise<BankAccount[]> {
    const accounts = await prisma.bankAccount.findMany({
      where: {
        userId,
      },
    })
    return accounts
  }
}
export { PrismaAccountRepository }
