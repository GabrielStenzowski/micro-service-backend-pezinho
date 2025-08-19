import { CreateUserProps, UpdatePasswordProps } from '@/@types/user'
import { User } from '@prisma/client'

interface IUserRepository {
  createUser(data: CreateUserProps): Promise<User>
  findByEmail(email: string): Promise<any>
  updatePassword(data: UpdatePasswordProps): Promise<any>
}

export { IUserRepository }
