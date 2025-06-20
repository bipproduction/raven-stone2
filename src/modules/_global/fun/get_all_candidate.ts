'use server'
import { prisma } from ".."

/**
 * Get data semua kandidat
 * @returns array data kandidat
 */

export default async function funGetAllCandidate() {
    const data = await prisma.candidate.findMany()

    return data
}