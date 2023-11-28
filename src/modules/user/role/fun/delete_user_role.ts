"use server"

import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache"

export default async function funDelUserRole({ id }: { id: number }) {

    //proses untuk delete data user role atau update isactive menjadi false
    // dan select menampilkan data yang ada di user role seperti id, name
    const data = await prisma.userRole.update({
        where: {
            id: id
        },
        data: {
            isActive: false
        },
        select: {
            id: true,
            name: true
        }
    })

    // berfungsi kembali ke path yang tertera pada url
    revalidatePath("/dashboard-admin/role-user")


    // berfungsi untuk menampilkan data success, message dan juga menampilkan  semua data
    // atau proses pengembalian yang terdiri dari success, message, data
    return {
        success: true,
        message: "success",
        delData: data
    }

}