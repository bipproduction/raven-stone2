'use server'
import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache";

/**
 * Upload data audience
 * @param body array yang berisikan data audience hasil dari file csv
 * @returns array success & message
 */

export default async function funUploadAudience({ body }: { body: any }) {

    // looping data csv
    for (let i of body) {
        // update data audience
        await prisma.audience.update({
            where: {
                id: Number(i.id)
            },
            data: {
                value: Number(i.value)
            }
        });
    }

    revalidatePath('dashboard-admin/audience')

    return {
        success: true,
        message: 'Sukses'
    }
}