'use server'

import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache";

/**
 * Fungsi untuk upload pct.
 * @param {body} body - menampilkan body.
 * @returns Untuk upload pct
 */
export default async function funUploadPct({ body }: { body: any }) {
    for (let i of body) {
        await prisma.publicConcernTrend.update({
            where: {
                id: Number(i.id)
            },
            data: {
                pendidikan: Number(i.pendidikan),
                infrastruktur: Number(i.infrastruktur),
                layananKesehatan: Number(i.layananKesehatan),
                kemiskinan: Number(i.kemiskinan),
                keadilanSosial: Number(i.keadilanSosial),
                lapanganPekerjaan: Number(i.lapanganPekerjaan),

            }
        });
    }

    revalidatePath('dashboard-admin/public-concern-trend')

    return {
        success: true,
        message: 'Sukses'
    }
}