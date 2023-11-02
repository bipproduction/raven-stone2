'use server'

import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache";

export default async function funUploadAudience({ body }: { body: any }) {
    for (let i of body) {
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