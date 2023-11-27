"use server"

import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache"

export default async function funAddSwot({ data, textContent }: { data: any, textContent: any }) {
    await prisma.swot.create({
        data: {
            idCandidate: Number(data.idCandidate),
            category: data.category,
            content: textContent
        }
    })

    revalidatePath("/dashboard-admin/swot")

    return {
        success: true,
        message: "Success"
    }
}