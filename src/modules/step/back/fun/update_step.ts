"use server"

import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache"

export default async function funUpdateStep({ data, textContent }: { data: any, textContent: any }) {
    await prisma.step.update({
        where: {
            id: data.id
        },
        data: {
            idCandidate: Number(data.idCandidate),
            category: data.category,
            sentiment: Number(data.sentiment),
            content: textContent
        }
    })

    revalidatePath("/dashboard-admin/step")

    return {
        success: true,
        message: "Success"
    }
}