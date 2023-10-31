"use server"

import { prisma } from "@/modules/_global"
import { seederKabupaten } from ".."
import { kabupatenCount } from "./fun_kabupaten_count"

/**
 * Fungsi untuk ambil data seeder kabupaten.
 * @returns hasil untuk data seeder kabupaten
 */
export async function funSeederKabupaten() {
    const cekKab = await kabupatenCount()

    if (cekKab > 0) {
        return {
            success: true,
            message: "Data kabupaten kota sudah ada"
        }
    } else {
        const ins = await prisma.areaKabkot.createMany({
            data: seederKabupaten
        })
        // for (let data of seederKabupaten) {
        //     await prisma.areaKabkot.upsert({
        //         where: {
        //             id: Number(data.id)
        //         },
        //         create: {
        //             id: Number(data.id),
        //             idProvinsi: Number(data.idProvinsi),
        //             name: data.name
        //         },
        //         update: {
        //             id: Number(data.id),
        //             idProvinsi: Number(data.idProvinsi),
        //             name: data.name
        //         }
        //     })
        // }
        return {
            success: true,
            message: "Success Kabupaten/ Kota"
        }
    }


}