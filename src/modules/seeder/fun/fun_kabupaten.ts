"use server"

import { countKabkot, prisma } from "@/modules/_global"
import { seederKabupaten } from ".."

/**
 * Fungsi untuk ambil data seeder kabupaten.
 * @returns hasil untuk data seeder kabupaten
 */

export async function funSeederKabupaten() {
    const cekKab = await countKabkot()

    if (cekKab > 0) {
        return {
            success: true,
            message: "Data kabupaten/kota sudah ada"
        }
    } else {
        const ins = await prisma.areaKabkot.createMany({
            data: seederKabupaten
        })
        return {
            success: true,
            message: "Success Kabupaten/Kota"
        }
    }


}