"use server"

import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache"


/**
 * Fungsi untuk add Jokowi Effect.
 * @param {data} data - menampilkan data.
 * @param {textContent} textContent - menampilkan textContent.
 * @returns Untuk add Jokowi Effect
 */
export default async function funAddJokowiEffect({ data, textContent }: { data: any, textContent: any }) {
    let y = new Date('1970-01-01 ' + data.timeContent)
    let isoDateTime = new Date(y.getTime() - (y.getTimezoneOffset() * 60000)).toISOString();

    //cek date and time
    const cek = await prisma.effect.count({
        where: {
            dateContent: new Date(data.dateContent),
            timeContent: isoDateTime,
            idCandidate: 7,
            isActive: true
        }
    })

    if (cek > 0) {
        return {
            success: false,
            message: "Sudah ada data pada tanggal " + data.dateContent + " dan jam " + data.timeContent,
            id: ''
        }
    }

    const insert = await prisma.effect.create({
        data: {
            idCandidate: 7,
            content: textContent,
            dateContent: new Date(data.dateContent),
            timeContent: isoDateTime
        },
        select: {
            id: true,
        }
    })

    revalidatePath("/dashboard-admin/jokowi-effect")
    revalidatePath("/dashboard-admin/jokowi-effect?date=" + data.dateContent)

    return {
        success: true,
        message: "Success",
        id: insert.id,
    }
}