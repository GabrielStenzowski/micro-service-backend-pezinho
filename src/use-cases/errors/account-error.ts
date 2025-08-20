export class AccountErrors extends Error {
  public error: string
  public errorCode: number
  public errorMessage: string
  constructor(error: string, errorCode: number, errorMessage: string) {
    super(errorMessage)
    this.error = error
    this.errorCode = errorCode
    this.errorMessage = errorMessage
  }
}
