"use server"

import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache"

/**
 * Fungsi untuk menambahkan Step.
 * @param {data} data - data dari id candidate dan category.
 * @param {textContent} textContent - digunakan untuk content.
 * @returns {data, textContent} Proses ini akan menghasilkan dari data dan textContent.
 */
export default async function funAddStep({ data, textContent }: { data: any, textContent: any }) {

    // proses add untuk menambahkan data
    // seperti idCandidate, category, dan content, sentiment
    await prisma.step.create({
        data: {
            idCandidate: Number(data.idCandidate),
            category: data.category,
            sentiment: Number(data.sentiment),
            content: textContent,
        },
    })

    // berfungsi kembali ke path yang tertera pada url
    revalidatePath("/dashboard-admin/step")

    // berfungsi untuk menampilkan data success, message,
    // atau proses pengembalian yang terdiri dari success, message
    return {
        success: true,
        message: "Success"
    }
}