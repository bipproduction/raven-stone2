'use server'

import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache";

export default async function funUploadSwot({ body }: { body: any }) {
    let can
    for (let i of body) {
        can = Number(i.idCandidate)
        if (i.id == '') {
            await prisma.swot.create({
                data: {
                    idCandidate: Number(i.idCandidate),
                    category: String(i.category).toUpperCase(),
                    content: String(i.content)
                }
            });
        } else {
            await prisma.swot.update({
                where: {
                    id: Number(i.id)
                },
                data: {
                    idCandidate: Number(i.idCandidate),
                    category: String(i.category).toUpperCase(),
                    content: String(i.content)
                }
            });
        }

    }

    revalidatePath('dashboard-admin/swot?candidate=' + can)

    return {
        success: true,
        message: 'Sukses'
    }
}