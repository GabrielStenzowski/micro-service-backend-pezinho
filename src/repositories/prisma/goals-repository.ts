import { CreateGoalProps } from '@/@types/goal'
import { IGoalsRepository } from '../i-goals-repository'
import { prisma } from '@/lib/prisma'
import { FinancialGoal } from '@prisma/client'

class PrismaGoalsRepository implements IGoalsRepository {
  async createGoal(data: CreateGoalProps): Promise<FinancialGoal> {
    const goal = await prisma.financialGoal.create({
      data: {
        userId: data.userdId,
        title: data.title,
        description: data.description,
        targetAmount: data.targetAmout,
        currentAmount: data.currentAmount,
        deadline: new Date(data.finalTime),
      },
    })
    return goal
  }
}

export { PrismaGoalsRepository }
