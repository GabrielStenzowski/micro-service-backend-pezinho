export type CreateCardProps = {
  userId: string
  accountId?: string
  cardName: string
  cardType: CardType
  limitAmount?: number
  currentBalance?: number
  dueDate?: number
}

export enum CardType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}
