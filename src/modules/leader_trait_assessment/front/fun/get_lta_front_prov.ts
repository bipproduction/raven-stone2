'use server'

import { prisma } from "@/modules/_global"
import _ from "lodash"

/**
 * Fungsi untuk get leader trait assessment provinsi.
 * @returns Untuk get leader trait assessment provinsi
 */
export default async function funGetLtaFrontProv() {
    const dataTable = await prisma.leaderTraitAssessment.findMany({
        select: {
            pekerjaKeras: true,
            cerdas: true,
            jujur: true,
            merakyat: true,
            tegas: true,
            berpengalamanMemimpin: true,
            berprestasi: true,
            latarBelakangMiliter: true,
            agamis: true,
            idProvinsi: true,
            AreaProvinsi: {
                select: {
                    name: true
                }
            }
        }
    })

    const format = dataTable.map((v: any) => ({
        ..._.omit(v, ["AreaProvinsi"]),
        name: v.AreaProvinsi.name
    }))

    const result = _.map(_.groupBy(format, "idProvinsi"), (v: any) => ({
        pekerjaKeras: _.sumBy(v, 'pekerjaKeras'),
        cerdas: _.sumBy(v, 'cerdas'),
        jujur: _.sumBy(v, 'jujur'),
        merakyat: _.sumBy(v, 'merakyat'),
        tegas: _.sumBy(v, 'tegas'),
        berpengalamanMemimpin: _.sumBy(v, 'berpengalamanMemimpin'),
        berprestasi: _.sumBy(v, 'berprestasi'),
        latarBelakangMiliter: _.sumBy(v, 'latarBelakangMiliter'),
        agamis: _.sumBy(v, 'agamis'),
        name: v[0].name,
        idProvinsi: v[0].idProvinsi,
    }))


    return result
}