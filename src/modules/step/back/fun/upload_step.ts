'use server'

import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache";

export default async function funUploadStep({ body }: { body: any }) {
    let can
    const valCat = ['SOCIAL', 'TECHNOLOGY', 'ECONOMY', 'POLITIC']
    for (let i of body) {
        can = Number(i.idCandidate)

        if (valCat.includes((i.category.toUpperCase()))) {
            if (i.id == '') {
                const cek = await prisma.step.findFirst({
                    where: {
                        isActive: true,
                        idCandidate: can,
                        category: String(i.category).toUpperCase(),
                        sentiment: (i.sentiment == "POSITIVE") ? 1 : 2
                    }
                })

                if (cek?.id) {
                    await prisma.step.update({
                        where: {
                            id: cek.id
                        },
                        data: {
                            content: String(i.content)
                        }
                    });
                } else {
                    await prisma.step.create({
                        data: {
                            idCandidate: Number(i.idCandidate),
                            category: String(i.category).toUpperCase(),
                            sentiment: (i.sentiment == "POSITIVE") ? 1 : 2,
                            content: String(i.content)
                        }
                    });
                }

            } else {
                await prisma.step.update({
                    where: {
                        id: Number(i.id)
                    },
                    data: {
                        idCandidate: Number(i.idCandidate),
                        category: String(i.category).toUpperCase(),
                        sentiment: (i.sentiment == "POSITIVE") ? 1 : 2,
                        content: String(i.content)
                    }
                });
            }
        }

    }

    revalidatePath('dashboard-admin/step?candidate=' + can)

    return {
        success: true,
        message: 'Sukses'
    }
}