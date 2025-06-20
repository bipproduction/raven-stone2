'use server'

import { prisma } from "@/modules/_global"

/**
 * Fungsi untuk Menghapus step.
 * @param {idData} idData - menampilkan idData.
 * @returns {IdData} Proses ini akan menghasilkan id Data dari step yang akan di hapus.
 */
export default async function funDelStepById({ idData }: { idData: any }) {

    //proses untuk delete data step atau update isactive menjadi false
    await prisma.step.update({
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