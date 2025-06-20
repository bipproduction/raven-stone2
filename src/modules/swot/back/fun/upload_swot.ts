'use server'

import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache";

export default async function funUploadSwot({ body }: { body: any }) {
    let can
    const valCat = ['STRENGTH', 'WEAKNESS', 'OPPORTUNITY', 'THREAT']
    for (let i of body) {
        can = Number(i.idCandidate)
        if (valCat.includes((i.category.toUpperCase()))) {
            if (i.id == '') {
                const cek = await prisma.swot.findFirst({
                    where: {
                        isActive: true,
                        idCandidate: can,
                        category: String(i.category).toUpperCase()
                    }
                })

                if (cek?.id) {
                    await prisma.swot.update({
                        where: {
                            id: cek.id
                        },
                        data: {
                            content: String(i.content)
                        }
                    });
                } else {
                    await prisma.swot.create({
                        data: {
                            idCandidate: can,
                            category: String(i.category).toUpperCase(),
                            content: String(i.content)
                        }
                    });
                }
            } else {
                await prisma.swot.update({
                    where: {
                        id: Number(i.id)
                    },
                    data: {
                        idCandidate: can,
                        category: String(i.category).toUpperCase(),
                        content: String(i.content)
                    }
                });
            }
        }

    }

    revalidatePath('dashboard-admin/swot?candidate=' + can)

    return {
        success: true,
        message: 'Sukses'
    }
}