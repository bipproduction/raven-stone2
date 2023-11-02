'use server'

import { prisma } from "@/modules/_global"
import _ from "lodash"

export default async function funSeederPct() {
    const cek = await prisma.publicConcernTrend.count()
    if (cek > 0) {
        const upd = await prisma.publicConcernTrend.updateMany({
            data: {
                pendidikan: 0,
                infrastruktur: 0,
                layananKesehatan: 0,
                kemiskinan: 0,
                lapanganPekerjaan: 0,
                keadilanSosial: 0
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
            idProvinsi: v.AreaProvinsi.id,
            pendidikan: 0,
            infrastruktur: 0,
            layananKesehatan: 0,
            kemiskinan: 0,
            lapanganPekerjaan: 0,
            keadilanSosial: 0
        }));


        const ins = await prisma.publicConcernTrend.createMany({
            data: wilayahTrue
        })
    }

    return {
        success: true,
        message: "Seeder Public Concern Trend"
    }
}