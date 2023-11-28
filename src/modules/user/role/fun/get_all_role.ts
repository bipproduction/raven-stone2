"use server"

import { prisma } from "@/modules/_global"

export default async function funGetAllRole() {

    //proses untuk menampilkan semua data yang ada di user role
    // yaitu yang berada pada select
    const data = await prisma.userRole.findMany({
        where: {
            isActive: true
        },
        select: {
            id: true,
            name: true
        }
    })

    // proses data user role
    // proses pengembalian data 
    return data
}