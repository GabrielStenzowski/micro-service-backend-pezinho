import { PrismaGoalsRepository } from '@/repositories/prisma/goals-repository'
import { CreateGoalUseCase } from '../goal/create-goal-use-case'

export function makeCreateGoalUseCase() {
  const goalRepository = new PrismaGoalsRepository()
  const useCase = new CreateGoalUseCase(goalRepository)
  return useCase
}
