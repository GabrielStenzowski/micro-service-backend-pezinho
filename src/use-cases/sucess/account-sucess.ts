export class AccountSucess {
  public readonly success: string
  public readonly successCode: number
  public readonly sucessMessage: string

  constructor(success: string, sucessCode: number, sucessMessage: string) {
    this.success = success
    this.successCode = sucessCode
    this.sucessMessage = sucessMessage
  }
}
