import { CreateCardProps } from '@/@types/card'
import { ICardRepository } from '@/repositories/i-card-repository'
import { CardErrors } from '../errors/card-errors'
import { th } from 'zod/v4/locales/index.cjs'
import { CardSucess } from '../sucess/card-sucess'

export class CreateCreditCardUseCase {
  constructor(private cardRepository: ICardRepository) {
    this.cardRepository = cardRepository
  }

  async execute(data: CreateCardProps) {
    if (!data.limitAmount) {
      throw new CardErrors(
        'Limit amount not found',
        404,
        'Cartão de crédito precisa ter um limite de crédito, caso não tenha coloque um limite alto!'
      )
    }

    if (!data.dueDate) {
      throw new CardErrors(
        'Due date not found',
        404,
        'Cartão de crédito precisa ter uma data de vencimento!'
      )
    }

    await this.cardRepository.createCard({
      userId: data.userId,
      cardName: data.cardName,
      cardType: data.cardType,
      limitAmount: data.limitAmount,
      currentBalance: data.currentBalance,
      dueDate: data.dueDate,
    })

    return new CardSucess(
      'Card created',
      201,
      'Cartão de crédito criado com sucesso'
    )
  }
}
