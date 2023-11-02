'use server'

import { prisma } from "@/modules/_global"
import { seederCandidate } from ".."

export async function funSeederCandidate() {
    for (let data of seederCandidate) {
        await prisma.candidate.upsert({
            where: {
                id: data.id
            },
            create: {
                id: data.id,
                name: data.name,
                img: data.img
            },
            update: {
                id: data.id,
                name: data.name,
                img: data.img
            }
        })
    }

    return {
        success: true,
        message: "Success Seeder Candidate"
    }
}