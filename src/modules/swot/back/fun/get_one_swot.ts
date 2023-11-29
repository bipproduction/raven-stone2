"use server"

import { prisma } from "@/modules/_global"


/**
 * Fungsi untuk Menampilkan swot by id.
 * @param {id} id - menampilkan id.
 * @returns {id} Proses ini akan menghasilkan id dan data dari swot yang akan di edit.
 */
export default async function funGetOneSwot({ id }: { id: any }) {

    //proses untuk menampilkan data uniq seperti id
    // proses tersebut menampilkan data yang terdapat di dalam select 
    const data = await prisma.swot.findUnique({
        where: {
            isActive: true,
            id: Number(id)
        },
        select: {
            id: true,
            idCandidate: true,
            category: true,
            content: true
        }
    })

    //proses pengembalian data
    return data
}