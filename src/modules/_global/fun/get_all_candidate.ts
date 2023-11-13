'use server'

import { prisma } from ".."

export default async function funGetAllCandidate() {
    const data = await prisma.candidate.findMany()

    return data
}