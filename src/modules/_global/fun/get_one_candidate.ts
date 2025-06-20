'use server'
import { prisma } from ".."

/**
 * Get one data kandidat berdasarkan kandidat id
 * @param candidate candidate id 
 * @returns array data kandidat
 */

export default async function funGetOneCandidate({ candidate }: { candidate: any }) {
    const data = await prisma.candidate.findUnique({
        where: {
            id: Number(candidate)
        }
    })

    return data
}