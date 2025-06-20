"use server"

import { prisma } from "@/modules/_global"


/**
 * Fungsi untuk Menampilkan Set User by id.
 * @param {id} id - menampilkan id.
 * @returns {id} Proses ini akan menghasilkan id dan data dari Set User yang akan di edit.
 */
export default async function funGetOneSetUser({id}: {id: any}) {

    //proses untuk menampilkan data uniq seperti id
    // proses tersebut menampilkan data yang terdpaat di dalam select 
    const data = await prisma.user.findUnique({
        where: {
            isActive: true,
            id: String(id)
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
            phone: true,
            idUserRole: true,
        }
    })

    //proses pengembalian data
    return data
}