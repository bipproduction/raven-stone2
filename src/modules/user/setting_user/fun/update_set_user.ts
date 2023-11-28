"use server"

import { prisma } from "@/modules/_global";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function funUpdateSetUser({ data }: { data: User }) {

    // proses update data user sesuai id,
    //  yang akan di proses terdapat di dalam data seperti idUserRole, name, email, password, phone 
    await prisma.user.update({
        where: {
            id: data.id
        },
        data: {
            idUserRole: Number(data.idUserRole),
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone
        }
    })
    
    // berfungsi kembali ke path yang tertera pada url
    revalidatePath("/dashboard-admin/setting-user")

     // berfungsi untuk menampilkan data success, message,
     // atau proses pengembalian yang terdiri dari success, message
    return {
        success: true,
        message: "Success"
    }
}