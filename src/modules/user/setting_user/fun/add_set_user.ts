"use server"

import { prisma } from "@/modules/_global";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function funAddSetUser({ data }: { data: any }) {

    // proses untuk membuat add data dengan menambahkan prisma beserta nama databse
    // dan terdapat data, di dalam data  terdapat nama dari database yang berfungsi untuk menampikan data apa saja yang akan masuk ke dalam database
    const ins = await prisma.user.create({
        data: {
            idUserRole: Number(data.idUserRole),
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone
        },
        select: {
            id: true
        }
    })

    // berfungsi kembali ke path yang tertera pada url
    revalidatePath("/dashboard-admin/setting-user")

    // berfungsi untuk menampilkan data success, message dan juga menampilkan select id 
    return {
        success: true,
        message: "Success",
        id: ins
    }
}