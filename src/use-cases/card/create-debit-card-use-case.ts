import { CreateCardProps } from '@/@types/card'
import { ICardRepository } from '@/repositories/i-card-repository'
import { CardErrors } from '../errors/card-errors'
import { IAccountRepository } from '@/repositories/i-account-repository'
import { CardSucess } from '../sucess/card-sucess'

export class CreateDebitCardUseCase {
  constructor(
    private cardRepository: ICardRepository,
    private accountRepository: IAccountRepository
  ) {
    this.cardRepository = cardRepository
    this.accountRepository = accountRepository
  }

  async execute(data: CreateCardProps) {
    if (!data.accountId) {
      throw new CardErrors(
        'Account not found',
        404,
        'Cartão de debito precisa estar vinculado a uma conta'
      )
    }

    const account = await this.accountRepository.getAccountById(data.accountId)
    if (!account) {
      throw new CardErrors('Account not found', 404, 'Conta não encontrada')
    }

    const existingDebitCard =
      await this.cardRepository.findCardByAccountIdAndType({
        accountId: data.accountId,
        cardType: data.cardType,
      })
    if (existingDebitCard) {
      throw new CardErrors(
        'Card already exists',
        409,
        'Já existe um cartão de débito vinculado a essa conta'
      )
    }

    await this.cardRepository.createCard({
      userId: account.userId,
      accountId: data.accountId,
      cardName: data.cardName,
      cardType: data.cardType,
      dueDate: data.dueDate,
    })
    return new CardSucess(
      'Card created',
      201,
      'Cartão de debito criado com sucesso'
    )
  }
}
