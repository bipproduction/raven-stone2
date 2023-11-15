"use server"

import { prisma } from "@/modules/_global";
import { revalidatePath } from "next/cache";

export default async function funUpdateMlAi({data, textContent}: {data: any, textContent: any}) {
    let y = new Date('1970-01-01 ' + data.timeContent)
    let isoDateTime = new Date(y.getTime() - (y.getTimezoneOffset() * 60000)).toISOString();
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
        message: "Success"
    }
}