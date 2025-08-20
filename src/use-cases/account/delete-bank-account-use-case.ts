import { DeleteAccountProps } from '@/@types/account'
import { IAccountRepository } from '@/repositories/i-account-repository'
import { AccountErrors } from '../errors/account-error'
import { th } from 'zod/v4/locales/index.cjs'
import { AccountSucess } from '../sucess/account-sucess'

export class DeleteBankAccountUseCase {
  constructor(private accountRepository: IAccountRepository) {
    this.accountRepository = accountRepository
  }

  async execute(data: DeleteAccountProps) {
    const account = await this.accountRepository.getAccountById(data.accountId)

    if (!account) {
      throw new AccountErrors('Account not found', 404, 'Conta nao encontrada')
    }

    if (account.userId !== data.userId) {
      throw new AccountErrors(
        'Unauthorized',
        403,
        'Você não tem permissão para excluir essa conta!'
      )
    }

    if (Number(account.bankBalance) !== 0) {
      throw new AccountErrors(
        'Account not empty',
        400,
        'Conta nao pode ser excluida pois ainda possui saldo'
      )
    }

    await this.accountRepository.deleteAccount(data.accountId)
    return new AccountSucess(
      'Account deleted',
      200,
      'Conta excluida com sucesso'
    )
  }
}
