"use server"

import { prisma } from "@/modules/_global";
import { revalidatePath } from "next/cache";


/**
 * Fungsi untuk update Set User.
 * @param {data} data - data dari id Set User.
 * @returns {data} Proses ini akan menghasilkan dari data .
 */
export default async function funUpdateSetUser({ data }: { data: any }) {

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