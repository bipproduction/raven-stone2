"use server"

import { prisma } from "@/modules/_global"


/**
 * Fungsi untuk Menampilkan User Role by id.
 * @param {id} id - menampilkan id.
 * @returns {id} Proses ini akan menghasilkan id dan data dari User Role yang akan di edit.
 */
export default async function funGetOneRoleUser({ id }: { id: number }) {

    // proses untuk menampilkan data userrole yang terdiri dari id dan name
    const data = await prisma.userRole.findUnique({
        where: {
            isActive: true,
            id: Number(id),
        },
        select: {
            id: true,
            name: true
        }
    })

    // proses menampilkan data user assess yaitu di dalam select : id component
    const dataAccess = await prisma.userAccess.findMany({
        where: {
            idUserRole: Number(id)
        },
        select: {
            idComponent: true
        }
    })



    // proses penggabungkan data user role dan user access
    // untuk data component yaitu proses looping agak mendapatkan struktur data yang di inginkan
    const allData = {
        dataRole: data,
        dataComponent: dataAccess.map((v) => (v.idComponent))
    }


    // proses pengembalian data allData
    return allData
}