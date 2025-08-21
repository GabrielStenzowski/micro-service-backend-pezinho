import { Card } from '@prisma/client'
import { ICardRepository } from '../i-card-repository'
import { CreateCardProps, FindCardByAccountIdAndTypeProps } from '@/@types/card'
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

  async deleteCard(cardId: string) {
    await prisma.card.delete({
      where: {
        id: cardId,
      },
    })
  }

  async findCardByAccountIdAndType(
    data: FindCardByAccountIdAndTypeProps
  ): Promise<Card | null> {
    const card = await prisma.card.findFirst({
      where: {
        accountId: data.accountId,
        cardType: data.cardType,
      },
    })
    return card
  }

  async findCardById(cardId: string): Promise<Card | null> {
    const card = await prisma.card.findUnique({
      where: {
        id: cardId,
      },
    })
    return card
  }
}

export { PrismaCardRepository }
