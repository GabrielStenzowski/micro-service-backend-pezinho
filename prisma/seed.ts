import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.typeAccount.create({
    data: { type: 'Conta Corrente' },
  })

  await prisma.typeAccount.create({
    data: { type: 'Conta Poupanca' },
  })

  await prisma.typeAccount.create({
    data: { type: 'Conta Investimento' },
  })

  console.log('✅ Seed concluída com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
