import { CreateGoalProps } from '@/@types/goal'
import { IGoalsRepository } from '@/repositories/i-goals-repository'

export class CreateGoalUseCase {
  constructor(private goalRepository: IGoalsRepository) {
    this.goalRepository = goalRepository
  }
  async execute(data: CreateGoalProps) {
    console.log(data)
  }
}
