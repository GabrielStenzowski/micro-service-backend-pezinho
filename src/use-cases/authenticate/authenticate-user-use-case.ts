import { AutheticateUserProps } from '@/@types/user'
import { IUserRepository } from '@/repositories/i-users-repository'
import { UsersErrors } from '../errors/users-errror'
import { compare, hash } from 'bcryptjs'
import { UsersSucess } from '../sucess/users-sucess'

class AuthenticateUserUseCase {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async execute(data: AutheticateUserProps) {
    const userAlreadyExist = await this.userRepository.findByEmail(data.email)

    if (!userAlreadyExist) {
      throw new UsersErrors(
        'User not found',
        404,
        'Usuário ou senha incorretos'
      )
    }

    const doesPasswordMatch = await compare(
      data.password,
      userAlreadyExist.password_hash
    )

    if (!doesPasswordMatch) {
      throw new UsersErrors(
        'User not found',
        404,
        'Usuário ou senha incorretos'
      )
    }
    return new UsersSucess('User Authenticated', 201, userAlreadyExist)
  }
}

export { AuthenticateUserUseCase }
