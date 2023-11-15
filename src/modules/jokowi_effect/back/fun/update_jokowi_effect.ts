"use server"

import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache";

export default async function funUpdateJokowiEffect({data, textContent}:{data: any, textContent: any}) {
    let y = new Date('1970-01-01 ' + data.timeContent)
    let isoDateTime = new Date(y.getTime() - (y.getTimezoneOffset() * 60000)).toISOString();
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


    return {
        success: true,
        message: "Success"
    }
}