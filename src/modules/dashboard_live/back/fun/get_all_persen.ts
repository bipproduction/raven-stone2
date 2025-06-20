"use server"

import { prisma } from "@/modules/_global"
import _ from "lodash"

/**
 * Fungsi untuk get all persen
 * @returns Untuk get all persen
 */
export default async function funGetAllPersen() {
  const data = await prisma.liveDashboardPersen.findMany({
    where: {
      isActive: true
    },
    orderBy: {
      idPaslon: 'asc'
    },
    select: {
      id: true,
      idPaslon: true,
      positive: true,
      negative: true,
      neutral: true,
      Paslon: {
        select: {
          nameCapres: true,
          nameCawapres: true
        }
      }
    }
  })

  const dataOmit = data.map((item: any) => ({
    ..._.omit(item, ["Paslon"]),
    capres: item.Paslon.nameCapres,
    cawapres: item.Paslon.nameCawapres,
  }))

  return dataOmit
}
