'use server'

import { prisma } from "@/modules/_global"
import _ from "lodash"


/**
 * Fungsi untuk reset & mengisi seeder audience.
 * @returns success & message
 */

export default async function funSeederAudience() {
    const cek = await prisma.audience.count()

    if (cek > 0) {
        const upd = await prisma.audience.updateMany({
            data: {
                value: 0
            }
        })
    } else {
        const dataWilayah = await prisma.areaKabkot.findMany({
            select: {
                id: true,
                AreaProvinsi: {
                    select: {
                        id: true,
                    }
                }
            }
        })

        const wilayahTrue = dataWilayah.map((v: any) => ({
            ..._.omit(v, ["id", "AreaProvinsi"]),
            idKabkot: v.id,
            idProvinsi: v.AreaKecamatan.AreaKabkot.AreaProvinsi.id,
            value: 0
        }));


        const ins = await prisma.audience.createMany({
            data: wilayahTrue
        })
    }


    return {
        success: true,
        message: "Seeder Audience Success"
    }
}