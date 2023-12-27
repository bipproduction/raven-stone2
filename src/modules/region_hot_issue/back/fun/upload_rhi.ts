'use server'

import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache";


/**
 * Fungsi untuk upload function upload Rhi.
 * @param {find} find - menampilkan find.
 * @returns Untuk upload function upload Rhi
 */
export default async function funUploadRhi({ body }: { body: any }) {
    let data
    for (let i of body) {
        data = await prisma.regionHotIssues.update({
            where: {
                id: Number(i.id)
            },
            data: {
                description: String(i.description)
            },
            select: {
                idProvinsi: true
            }
        });
    }

    revalidatePath('dashboard-admin/region-hot-issue?prov=' + data?.idProvinsi)

    return {
        success: true,
        message: 'Sukses'
    }
}