"use server"

import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache"

export default async function funUpdateSwot({ data, textContent }: { data: any, textContent: any }) {
    await prisma.swot.update({
        where: {
            id: data.id
        },
        data: {
            idCandidate: Number(data.idCandidate),
            category: data.category,
            content: textContent
        }
    })

    revalidatePath("/dahsboard0-admin/swot")

    return {
        success: true,
        message: "Success"
    }
}