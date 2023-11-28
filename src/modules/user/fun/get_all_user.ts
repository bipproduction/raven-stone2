'use server'

import { prisma } from "@/modules/_global"

export default async function funGetAllUser() {

    //prose menampikan semua data user
    const data = await prisma.user.findMany({
        where: {
            isActive: true
        }
    })

    // proses pengembalian data user
    return data
}