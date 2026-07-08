import { prisma } from '#/db'

const APP_TIMEZONE = 'Europe/Budapest'

export async function getAppTimestamp(): Promise<Date> {
  const result = await prisma.$queryRaw<Array<{ now: Date }>>`
    SELECT (now() AT TIME ZONE ${APP_TIMEZONE})::timestamp AS now
  `

  return result[0].now
}
