import { DeleteCardProps } from '@/@types/card'
import { ICardRepository } from '@/repositories/i-card-repository'
import { CardErrors } from '../errors/card-errors'
import { CardSucess } from '../sucess/card-sucess'

export class DeleteCardUseCase {
  constructor(private cardRepository: ICardRepository) {
    this.cardRepository = cardRepository
  }
  async execute(data: DeleteCardProps) {
    const card = await this.cardRepository.findCardById(data.cardId)

    if (!card) {
      throw new CardErrors('Not Found', 404, 'Cartão não encontrado!')
    }

    if (card.userId !== data.userId) {
      throw new CardErrors(
        'Unauthorized',
        403,
        'Você não tem permissão para excluir esse cartão!'
      )
    }

    if (Number(card?.currentBalance) !== 0.0) {
      throw new CardErrors(
        'Card not empty',
        400,
        'Cartão não pode ser excluida pois ainda possui saldo'
      )
    }

    await this.cardRepository.deleteCard(data.cardId)
    return new CardSucess('Card deleted', 200, 'Cartão excluido com sucesso')
  }
}
