"use server"

import { prisma } from "@/modules/_global"
import _ from "lodash"

/**
 * Fungsi untuk menampilkan set User.
 * @returns  Proses ini akan menampilkan keseluruhan data dari set user.
 */
export async function funGetAllSetUser() {

    //proses untuk menampilkan semua data yang ada di user
    // yaitu yang berada pada select
    const data = await prisma.user.findMany({
        // where: {
        //     isActive: true,
        // },
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
            phone: true,
            isActive: true,
            UserRole: {
                select: {
                    name: true
                }
            }
        },
        orderBy:{
            idUserRole: 'asc'
        }
    })

    // proses omit untuk merapikan hasil dari data user, sesuai apa yang kita inginkan
    const dataOmit = data.map((item: any) => ({
        ..._.omit(item, ["User"], ["userRole"]),
        name: item.name,
        email: item.email,
        password: item.password,
        phone: item.phone,
        UserRole: item.UserRole.name
    }))

    //proses dataomit yang sudah di rapikan
    return dataOmit
}