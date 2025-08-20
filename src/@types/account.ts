export type CreateAccountProps = {
  userId: string
  accountName: string
  accountType: string
  bankBalance: number
}

export type GetAccountByNameAndUserIdProps = {
  userId: string
  accountName: string
}

export type DeleteAccountProps = {
  userId: string
  accountId: string
}
