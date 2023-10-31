"use server"

import { prisma } from "@/modules/_global"
import { seederProvinsi } from ".."

/**
 * Fungsi untuk ambil data seeder provinsi .
 * @returns hasil untuk data seeder provinsi
 */
export async function funSeederProvinsi() {
    const ProCount = await prisma.areaProvinsi.count({
        where: {
            isActive: true,
        }
    })

    if (ProCount > 0) {
        return {
            success: true,
            message: "Data Provinsi sudah ada"
        }
    } else {
        const ins = await prisma.areaProvinsi.createMany({
            data: seederProvinsi
        })
        return {
            success: true,
            message: "Success Provinsi"
        }
    }

    // return {
    //     success: true,
    //     message: "Success Provinsi"
    // }

}