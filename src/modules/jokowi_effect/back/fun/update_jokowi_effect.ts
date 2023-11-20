"use server"

import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache";

export default async function funUpdateJokowiEffect({ data, textContent }: { data: any, textContent: any }) {
    let y = new Date('1970-01-01 ' + data.timeContent)
    let isoDateTime = new Date(y.getTime() - (y.getTimezoneOffset() * 60000)).toISOString();

    const cek = await prisma.effect.count({
        where: {
            isActive: true,
            idCandidate: 7,
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

    await prisma.effect.update({
        where: {
            id: data.id
        },
        data: {
            idCandidate: 7,
            content: textContent,
            dateContent: new Date(data.dateContent),
            timeContent: isoDateTime
        }
    })

    revalidatePath("/dashboard-admin/jokowi-effect")
    revalidatePath("/dashboard-admin/jokowi-effect?date=" + data.dateContent)


    return {
        success: true,
        message: "Success",
        id: data.id
    }
}