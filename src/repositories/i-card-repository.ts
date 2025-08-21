import { CardType, CreateCardProps } from '@/@types/card'
import { Card } from '@prisma/client'

interface ICardRepository {
  createCard(data: CreateCardProps): Promise<Card>
  findCardByAccountIdAndType(data: {
    accountId: string
    cardType: CardType
  }): Promise<Card | null>
  findCardById(cardId: string): Promise<Card | null>
  deleteCard(cardId: string): Promise<void>
}

export { ICardRepository }
