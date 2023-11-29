"use server"

import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache"


/**
 * Fungsi untuk update swot.
 * @param {data} data - data dari id candidate dan category.
 * @param {textContent} textContent - digunakan untuk content.
 * @returns {data, textContent} Proses ini akan menghasilkan dari data dan textContent.
 */
export default async function funUpdateSwot({ data, textContent }: { data: any, textContent: any }) {

    // proses update data user sesuai id,
    //  yang akan di proses terdapat di dalam data seperti idCandidate, category, content
    await prisma.swot.update({
        where: {
            id: data.id
        },
        data: {
            idCandidate: Number(data.idCandidate),
            category: data.category,
            content: textContent
        }
    })

    // berfungsi kembali ke path yang tertera pada url
    revalidatePath("/dahsboard0-admin/swot")


    // berfungsi untuk menampilkan data success, message,
    // atau proses pengembalian yang terdiri dari success, message
    return {
        success: true,
        message: "Success"
    }
}