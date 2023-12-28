'use server'

import { prisma } from "@/modules/_global"


/**
 * Fungsi untuk cek emotion candidate.
 * @param {data} data - menampilkan data.
 * @param {candidate} candidate - menampilkan candidate.
 * @returns Untuk  cek emotion candidate
 */
export default async function funCekEmotionCandidate({ date, candidate }: { date: any, candidate: any }) {
    const data = await prisma.candidateEmotion.count({
        where: {
            dateEmotion: date,
            idCandidate: Number(candidate)
        }
    })


    if (data > 0) {
        return { ada: true }
    }

    return { ada: false }
}