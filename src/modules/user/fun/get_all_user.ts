'use server'

import { prisma } from "@/modules/_global"


/**
 * Fungsi untuk menampilkan  User.
 * @returns  Proses ini akan menampilkan keseluruhan data dari user.
 */
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