"use server"

import { prisma } from "@/modules/_global";
import { revalidatePath } from "next/cache";

export default async function funAddMlAi({ data, textContent }: { data: any, textContent: any }) {

    let y = new Date('1970-01-01 ' + data.timeContent)
    let isoDateTime = new Date(y.getTime() - (y.getTimezoneOffset() * 60000)).toISOString();
    await prisma.mlAi.create({
        data: {
            idPaslon: Number(data.idPaslon),
            content: textContent,
            dateContent: new Date(data.dateContent),
            timeContent: isoDateTime
        },
        select: {
            id: true,
            idPaslon: true,
            content: true,
            dateContent: true,
            timeContent: true,
        }
    })

    revalidatePath("/dashboard-admin/ml-ai")

    return {
        success: true,
        message: "Success"
    }
}