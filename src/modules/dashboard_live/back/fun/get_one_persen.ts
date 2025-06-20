"use server"

import { prisma } from "@/modules/_global"
import _ from "lodash"

/**
 * Fungsi untuk get one persen.
 * @param {id} id - menampilkan id.
 * @returns Untuk get one persen
 */
export default async function funGetOnePersen({id}: {id: any}) {
    const data = await prisma.liveDashboardPersen.findUnique({
        where: {
            isActive: true,
            id: Number(id)
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

    if(data){
      return data
    }

    return []
}