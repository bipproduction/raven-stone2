"use server"

import { prisma } from "@/modules/_global"

/**
 * Fungsi untuk menampilkan Component.
 * @returns  Proses ini akan menampilkan keseluruhan data dari component.
 */
export default async function funGetAllComponents() {

    //proses untuk menampilkan semua data yang ada di components
    // yaitu yang berada pada select
    const data = await prisma.component.findMany({
        where: {
            isActive: true
        },
        select: {
            id: true,
            menu: true,
            label: true,
        }
    })

    // proses data componets
    // atau proses pengembalian data
    return data
}