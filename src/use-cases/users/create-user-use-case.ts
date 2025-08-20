import { CreateUserProps } from '@/@types/user'
import { IUserRepository } from '@/repositories/i-users-repository'
import { hash } from 'bcryptjs'
import { UsersErrors } from '../errors/users-errror'
import { UsersSucess } from '../sucess/users-sucess'
export class CreateUserUseCase {
  constructor(private usersRepository: IUserRepository) {
    this.usersRepository = usersRepository
  }

  async execute(data: CreateUserProps) {
    const password_hash = await hash(data.password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(data.email)

    if (userWithSameEmail) {
      throw new UsersErrors(
        'User already exists',
        409,
        'Email já está em uso no sistema. Por favor se cadastre com outro'
      )
    }

    await this.usersRepository.createUser({
      name: data.name,
      email: data.email,
      password: password_hash,
      dateOfBirth: new Date(data.dateOfBirth),
      gender: data.gender,
    })
    return new UsersSucess('User created', 201, 'Usuário criado com sucesso')
  }
}
