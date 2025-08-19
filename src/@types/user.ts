export enum TypeGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export type CreateUserProps = {
  name: string
  email: string
  password: string
  dateOfBirth: Date
  gender: TypeGender
}

export type UpdatePasswordProps = {
  userId: string
  newPassword: string
}
