import { time } from 'console';
"use server"

import { prisma } from "@/modules/_global"

export default async function funCekAddJokowiEffect({ tanggal, waktu }: { tanggal: any, waktu: any }) {
    const data = await prisma.effect.count({
        where: {
            idCandidate: 7,
            dateContent: tanggal,
            timeContent: waktu
        }
    })

    if (data > 0) {
        return { ada: true }
    }

    return { ada: false }
}