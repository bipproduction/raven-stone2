"use server"

import { prisma } from "@/modules/_global"

/**
 * Fungsi untuk menampilkan user role.
 * @returns  Proses ini akan menampilkan keseluruhan data dari user role.
 */
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