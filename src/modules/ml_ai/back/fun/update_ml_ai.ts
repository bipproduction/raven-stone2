"use server"

import { prisma } from "@/modules/_global";
import { revalidatePath } from "next/cache";


/**
 * Fungsi untuk update ml ai.
 * @param {data} data - menampilkan data.
 * @param {textContent} textContent - menampilkan textContent.
 * @returns Untuk update ml ai
 */
export default async function funUpdateMlAi({ data, textContent }: { data: any, textContent: any }) {
    let y = new Date('1970-01-01 ' + data.timeContent)
    let isoDateTime = new Date(y.getTime() - (y.getTimezoneOffset() * 60000)).toISOString();

    const cek = await prisma.mlAi.count({
        where: {
            isActive: true,
            idPaslon: Number(data.idPaslon),
            dateContent: new Date(data.dateContent),
            timeContent: isoDateTime,
            NOT: {
                id: data.id
            }
        }
    })

    if (cek > 0) {
        return {
            success: false,
            message: "Sudah ada data pada tanggal " + data.dateContent + " dan jam " + data.timeContent,
            id: ''
        }
    }

    await prisma.mlAi.update({
        where: {
            id: data.id
        },
        data: {
            idPaslon: Number(data.idPaslon),
            content: textContent,
            dateContent: new Date(data.dateContent),
            timeContent: isoDateTime
        }
    })
    revalidatePath("/dashboard-admin/ml-ai")

    return {
        success: true,
        message: "Success",
        id: data.id
    }
}