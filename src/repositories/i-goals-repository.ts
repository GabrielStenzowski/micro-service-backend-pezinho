import { CreateGoalProps } from '@/@types/goal'
import { FinancialGoal } from '@prisma/client'

interface IGoalsRepository {
  createGoal(data: CreateGoalProps): Promise<FinancialGoal>
}

export { IGoalsRepository }
