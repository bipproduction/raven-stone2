'use server'

import { prisma } from "@/modules/_global"
import { seederPersenLive } from ".."

export async function funSeederPersenLive() {
    for (let data of seederPersenLive) {
        await prisma.liveDashboardPersen.upsert({
            where: {
                id: data.id
            },
            create: {
                id: data.id,
                idPaslon: data.idPaslon,
                positive: data.positive,
                neutral: data.neutral,
                negative: data.negative
            },
            update: {
                idPaslon: data.idPaslon,
                positive: data.positive,
                neutral: data.neutral,
                negative: data.negative
            }
        })
    }

    return {
        success: true,
        message: "Success Seeder Persen Live Dashboard"
    }
}