"use server"

import { prisma } from "@/modules/_global"

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