"use server"

import { prisma } from "@/modules/_global";
import { revalidatePath } from "next/cache";

/**
 * Fungsi untuk add ml ai.
 * @param {data} data - menampilkan data.
 * @param {textContent} textContent - menampilkan textContent.
 * @returns Untuk add ml ai
 */
export default async function funAddMlAi({ data, textContent }: { data: any, textContent: any }) {

    let y = new Date('1970-01-01 ' + data.timeContent)
    let isoDateTime = new Date(y.getTime() - (y.getTimezoneOffset() * 60000)).toISOString();

    const cek = await prisma.mlAi.count({
        where: {
            isActive: true,
            idPaslon: Number(data.idPaslon),
            dateContent: new Date(data.dateContent),
            timeContent: isoDateTime
        }
    })

    if (cek > 0) {
        return {
            success: false,
            message: "Sudah ada data pada tanggal " + data.dateContent + " dan jam " + data.timeContent,
            id: ''
        }
    }

    const insert = await prisma.mlAi.create({
        data: {
            idPaslon: Number(data.idPaslon),
            content: textContent,
            dateContent: new Date(data.dateContent),
            timeContent: isoDateTime
        },
        select: {
            id: true,
        }
    })

    revalidatePath("/dashboard-admin/ml-ai")
    revalidatePath("/dashboard-admin/ml-ai?paslon=" + data.idPaslon + "&date=" + data.dateContent)

    return {
        success: true,
        message: "Success",
        id: insert.id,
    }
}