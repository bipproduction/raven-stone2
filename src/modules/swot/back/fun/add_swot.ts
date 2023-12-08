"use server"

import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache"


/**
 * Fungsi untuk menambahkan swot.
 * @param {data} data - data dari id candidate dan category.
 * @param {textContent} textContent - digunakan untuk content.
 * @returns {data, textContent} Proses ini akan menghasilkan dari data dan textContent.
 */
export default async function funAddSwot({ data, textContent }: { data: any, textContent: any }) {

    // proses add untuk menambahkan data
    // seperti idCandidate, category, dan content
    await prisma.swot.create({
        data: {
            idCandidate: Number(data.idCandidate),
            category: data.category,
            content: textContent
        }
    })

    // berfungsi kembali ke path yang tertera pada url
    revalidatePath("/dashboard-admin/swot")

    // berfungsi untuk menampilkan data success, message,
    // atau proses pengembalian yang terdiri dari success, message
    return {
        success: true,
        message: "Success"
    }
}