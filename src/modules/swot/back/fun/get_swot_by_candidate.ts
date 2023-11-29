'use server'

import { prisma } from "@/modules/_global"

/**
 * Fungsi untuk menampilkan swot by id.
 * @param {candidate} candidate - menampilakan candidate.
 * @returns {candidate} Proses ini akan menampilakan swot by id.
 */
export default async function funGetSwotByCandidate({ candidate }: { candidate: any }) {

    // proses ini menampilkan data swot seperti idCandidate
    const result = await prisma.swot.findMany({
        where: {
            idCandidate: candidate,
            isActive: true
        }
    })

    // proses ini menampilkan data uniq seperti id yang ada di candidate
    const dCandidate = await prisma.candidate.findUnique({
        where: {
            id: candidate
        }
    })

    // proses ini menampilkan allData yang terdiri dari title yang di ambil dari dCanidate dan result
    const allData = {
        title: dCandidate?.name,
        data: result
    }

    // proses pengembalian allData
    return allData
}