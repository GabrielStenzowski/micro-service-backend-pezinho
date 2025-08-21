import { DeleteAccountProps } from '@/@types/account'
import { IAccountRepository } from '@/repositories/i-account-repository'
import { AccountErrors } from '../errors/account-error'
import { th } from 'zod/v4/locales/index.cjs'
import { AccountSucess } from '../sucess/account-sucess'
import { ICardRepository } from '@/repositories/i-card-repository'
import { CardType } from '@/@types/card'

export class DeleteBankAccountUseCase {
  constructor(
    private accountRepository: IAccountRepository,
    private cardRepository: ICardRepository
  ) {
    this.accountRepository = accountRepository
    this.cardRepository = cardRepository
  }

  async execute(data: DeleteAccountProps) {
    const account = await this.accountRepository.getAccountById(data.accountId)
    const cards = await this.cardRepository.findCardByAccountIdAndType({
      accountId: data.accountId,
      cardType: CardType.DEBIT,
    })

    if (cards) {
      throw new AccountErrors(
        'Card already exists',
        409,
        'Existe um cartão vinculado a essa conta, exclua o cartão primeiro!'
      )
    }

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
