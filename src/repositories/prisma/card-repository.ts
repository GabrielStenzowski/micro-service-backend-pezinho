import { Card } from '@prisma/client'
import { ICardRepository } from '../i-card-repository'
import { CreateCardProps } from '@/@types/card'
import { prisma } from '@/lib/prisma'

class PrismaCardRepository implements ICardRepository {
  async createCard(data: CreateCardProps): Promise<Card> {
    const card = await prisma.card.create({
      data: {
        userId: data.userId,
        accountId: data.accountId,
        cardName: data.cardName,
        cardType: data.cardType,
        limitAmount: data.limitAmount,
        currentBalance: data.currentBalance,
        dueDate: data.dueDate,
      },
    })
    return card
  }
}

export { PrismaCardRepository }
