'use server'
import { prisma } from "@/modules/_global"

/**
 * Get data semua paslon, sesuai dg urutan id
 * @returns array data paslon
 */

export default async function funGetAllPaslonFront() {
    const data = await prisma.paslon.findMany({
        orderBy: {
            id: "asc"
        }
    })

    return data
}