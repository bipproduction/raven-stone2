'use server'

import { prisma } from ".."

export default async function funGetOnePaslon({ paslon }: { paslon: any }) {
    const data = await prisma.paslon.findUnique({
        where: {
            id: paslon
        }
    })

    return data
}