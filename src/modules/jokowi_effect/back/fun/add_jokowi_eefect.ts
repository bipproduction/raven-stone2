"use server"

import { prisma } from "@/modules/_global"
import { Effect } from "@prisma/client"
import moment from "moment"
import { revalidatePath } from "next/cache"

export default async function funAddJokowiEffect({ data, textContent }: { data: any, textContent: any }) {
    let y = new Date('1970-01-01 ' + data.timeContent)
    let isoDateTime = new Date(y.getTime() - (y.getTimezoneOffset() * 60000)).toISOString();
    await prisma.effect.create({
        data: {
            idCandidate: 7,
            content: textContent,
            dateContent: new Date(data.dateContent),
            timeContent: isoDateTime
        },
        select: {
            id: true,
            content: true,
            dateContent: true,
            timeContent: true,
        }
    })

    revalidatePath("/dashboard-admin/jokowi-effect")
    return {
        success: true,
        message: "Success"
    }
}