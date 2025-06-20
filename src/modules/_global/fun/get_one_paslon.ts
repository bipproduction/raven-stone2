'use server'
import { prisma } from ".."

/**
 * Get one data paslon berdasarkan paslon id
 * @param paslon paslon id
 * @returns array data paslon
 */

export default async function funGetOnePaslon({ paslon }: { paslon: any }) {
    const data = await prisma.paslon.findUnique({
        where: {
            id: Number(paslon)
        }
    })

    return data
}