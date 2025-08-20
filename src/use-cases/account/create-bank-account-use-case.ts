import { CreateAccountProps } from '@/@types/account'
import { IAccountRepository } from '@/repositories/i-account-repository'
import { AccountSucess } from '../sucess/account-sucess'
import { AccountErrors } from '../errors/account-error'

export class CreateBankAccountUseCase {
  constructor(private accountRepository: IAccountRepository) {
    this.accountRepository = accountRepository
  }

  async execute(data: CreateAccountProps) {
    const accountWithSameName =
      await this.accountRepository.getAccountByNameAndUserId({
        userId: data.userId,
        accountName: data.accountName,
      })

    if (accountWithSameName) {
      throw new AccountErrors(
        'Account already exists',
        409,
        'Ja existe uma conta com esse nome'
      )
    }

    const accountsCount = await this.accountRepository.countAccountsByUserId(
      data.userId
    )
    if (accountsCount >= 10) {
      throw new AccountErrors(
        'Account limit reached',
        400,
        'Usuário já possui o máximo de 10 contas permitidas'
      )
    }

    await this.accountRepository.createAccount({
      userId: data.userId,
      accountName: data.accountName,
      accountType: data.accountType,
      bankBalance: 0.0,
    })

    return new AccountSucess('Account created', 201, 'Conta criada com sucesso')
  }
}
