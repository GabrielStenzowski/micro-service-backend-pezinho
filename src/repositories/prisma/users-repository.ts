import { prisma } from '@/lib/prisma'
import { IUserRepository } from '../i-users-repository'
import { CreateUserProps, UpdatePasswordProps } from '@/@types/user'
import { User } from '@prisma/client'

class PrismaUserRepository implements IUserRepository {
  async createUser(data: CreateUserProps): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password_hash: data.password,
        date_birth: new Date(data.dateOfBirth),
        gender: data.gender,
      },
    })
    return user
  }
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }

  async updatePassword(data: UpdatePasswordProps) {
    const user = await prisma.user.update({
      where: { id: data.userId },
      data: {
        password_hash: data.newPassword,
      },
    })
    return user
  }
}

export { PrismaUserRepository }
