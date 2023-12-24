'use server'

import { prisma } from "@/modules/_global"


/**
 * Fungsi untuk menampilkan swot by candidate.
 * @param {candidate} candidate - menampilakan candidate.
 * @returns {candidate} Proses ini untuk menampilkan data swot by candidate.
 */
export default async function funGetSwotFront({ candidate }: { candidate: any }) {

    // proses ini untuk menampilkan id Candidate
    const data = await prisma.swot.findMany({
        where: {
            idCandidate: Number(candidate),
            isActive: true
        }
    })

    // proses pengambalian data 
    return data
}