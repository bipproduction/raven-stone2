'use server'

import { prisma } from "@/modules/_global"


/**
 * Fungsi untuk Menghapus swot.
 * @param {idData} idData - menampilkan idData.
 * @returns {IdData} Proses ini akan menghasilkan id Data dari swot yang akan di hapus.
 */
export default async function funDelSwotById({ idData }: { idData: any }) {

    //proses untuk delete data swot atau update isactive menjadi false
    await prisma.swot.update({
        where: {
            id: idData
        },
        data: {
            isActive: false
        }
    })

    // berfungsi untuk menampilkan data success, message dan juga menampilkan  semua data
    // atau proses pengembalian yang terdiri dari success, dan message
    return {
        success: true,
        message: 'Sukses'
    }
}