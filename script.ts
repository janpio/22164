import { PrismaClient, QuestStatus } from '@prisma/client'

const prisma = new PrismaClient()

// A `main` function so that we can use async/await
async function main() {
  const userId = "1"
  const complete_check = await prisma.weeklyQuest.updateMany({
    where: {
      userId,
      status: QuestStatus.accepted,
      value: { gte: prisma.weeklyQuest.fields.require_value },
    },
    data: {
      status: { set: QuestStatus.complete },
    },
  })
  console.log({complete_check})
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })