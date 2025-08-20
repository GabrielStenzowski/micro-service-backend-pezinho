import { CreateCardProps } from '@/@types/card'
import { Card } from '@prisma/client'

interface ICardRepository {
  createCard(data: CreateCardProps): Promise<Card>
}

export { ICardRepository }
