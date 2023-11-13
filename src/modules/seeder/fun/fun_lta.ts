'use server'

import { prisma } from "@/modules/_global"
import _ from "lodash"

export default async function funSeederLta() {
    const cek = await prisma.leaderTraitAssessment.count()
    if (cek > 0) {
        const upd = await prisma.leaderTraitAssessment.updateMany({
            data: {
                pekerjaKeras: 0,
                cerdas: 0,
                jujur: 0,
                merakyat: 0,
                tegas: 0,
                berpengalamanMemimpin: 0,
                berprestasi: 0,
                latarBelakangMiliter: 0,
                agamis: 0
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
            pekerjaKeras: 0,
            cerdas: 0,
            jujur: 0,
            merakyat: 0,
            tegas: 0,
            berpengalamanMemimpin: 0,
            berprestasi: 0,
            latarBelakangMiliter: 0,
            agamis: 0
        }));


        const ins = await prisma.leaderTraitAssessment.createMany({
            data: wilayahTrue
        })
    }

    return {
        success: true,
        message: "Seeder Value Leader Trait Assessment"
    }
}