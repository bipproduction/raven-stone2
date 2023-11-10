'use server'

import { prisma } from ".."

export default async function funGetOneCandidate({ candidate }: { candidate: any }) {
    const data = await prisma.candidate.findUnique({
        where: {
            id: Number(candidate)
        }
    })

    return data
}