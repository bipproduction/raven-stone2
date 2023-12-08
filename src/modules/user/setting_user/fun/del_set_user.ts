"use server"

import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache"

/**
 * Fungsi untuk Menghapus set User.
 * @param {id} id - menampilkan id.
 * @returns {id} Proses ini akan menghasilkan id Data dari set User yang akan di hapus.
 */
export default async function funDelSetUser({ id }: { id: any }) {

    //proses untuk delete data user atau update isactive menjadi false
    // dan select menampilkan data yang ada di user id
    const data = await prisma.user.update({
        where: {
            id: String(id)
        },
        data: {
            isActive: false
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

    // berfungsi kembali ke path yang tertera pada url
    revalidatePath("/dashboard-admin/setting-user")


    // berfungsi untuk menampilkan data success, message dan juga menampilkan  semua data
    // atau proses pengembalian yang terdiri dari success, message, data
    return {
        success: true,
        message: "success",
        delData: data
    }
}