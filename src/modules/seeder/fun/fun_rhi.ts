'use server'

import { prisma } from "@/modules/_global"
import _ from "lodash"

/**
 * Fungsi untuk ambil data seeder user access.
 * @returns hasil untuk data seeder user access
 */
export default async function funSeederRhi() {

    const cek = await prisma.regionHotIssues.count()
    if (cek > 0) {
        const upd = await prisma.regionHotIssues.updateMany({
            data: {
                description: '-'
            }
        })
    } else {
        const dataKabkot = await prisma.areaKabkot.findMany({
            select: {
                id: true,
                idProvinsi: true,
            }
        })

        const wilayahTrueKabkot = dataKabkot.map((v: any) => ({
            ..._.omit(v, ["id"]),
            idKabkot: v.id,
            idProvinsi: v.idProvinsi,
            description: '-'
        }));

        await prisma.regionHotIssues.createMany({
            data: wilayahTrueKabkot
        })
    }

    return {
        success: true,
        message: "Seeder Value Region Hot Issues"
    }
}