'use server'
import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache"

export default async function funSetActiveUser({ dataUpdate }: { dataUpdate: any }) {
    const data = await prisma.user.update({
        where: {
            id: dataUpdate.idUser
        },
        data: {
            isActive: dataUpdate.active
        }
    })

    // berfungsi kembali ke path yang tertera pada url
    revalidatePath("/dashboard-admin/setting-user")


    // berfungsi untuk menampilkan data success, message dan juga menampilkan  semua data
    // atau proses pengembalian yang terdiri dari success, message, data
    return {
        success: true,
        message: "success",
        delData: []
    }
}