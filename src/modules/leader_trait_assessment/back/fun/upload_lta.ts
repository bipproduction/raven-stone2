'use server'

import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache";


/**
 * Fungsi untuk upload leader trait assessment by area.
 * @param {body} body - menampilkan body.
 * @returns Untuk upload leader trait assessment by area
 */
export default async function funUploadLta({ body }: { body: any }) {
    for (let i of body) {
        await prisma.leaderTraitAssessment.update({
            where: {
                id: Number(i.id)
            },
            data: {
                pekerjaKeras: Number(i.pekerjaKeras),
                cerdas: Number(i.cerdas),
                jujur: Number(i.jujur),
                merakyat: Number(i.merakyat),
                tegas: Number(i.tegas),
                berpengalamanMemimpin: Number(i.berpengalamanMemimpin),
                berprestasi: Number(i.berprestasi),
                latarBelakangMiliter: Number(i.latarBelakangMiliter),
                agamis: Number(i.agamis)
            }
        });
    }

    revalidatePath('dashboard-admin/leader-trait-assessment')

    return {
        success: true,
        message: 'Sukses'
    }
}