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
        total: _.sum([
            _.sumBy(v, 'pekerjaKeras'),
            _.sumBy(v, 'cerdas'),
            _.sumBy(v, 'jujur'),
            _.sumBy(v, 'merakyat'),
            _.sumBy(v, 'tegas'),
            _.sumBy(v, 'berpengalamanMemimpin'),
            _.sumBy(v, 'berprestasi'),
            _.sumBy(v, 'latarBelakangMiliter'),
            _.sumBy(v, 'agamis'),
        ])
    }))

    const persen = result.map((v: any) => ({
        name: v.name,
        idProvinsi: v.idProvinsi,
        total: v.total,
        pekerjaKeras: _.round((Number(v.pekerjaKeras) / v.total) * 100, 2),
        cerdas:  _.round((Number(v.cerdas) / v.total) * 100, 2),
        jujur:  _.round((Number(v.jujur) / v.total) * 100, 2),
        merakyat:  _.round((Number(v.merakyat) / v.total) * 100, 2),
        tegas:  _.round((Number(v.tegas) / v.total) * 100, 2),
        berpengalamanMemimpin:  _.round((Number(v.berpengalamanMemimpin) / v.total) * 100, 2),
        berprestasi:  _.round((Number(v.berprestasi) / v.total) * 100, 2),
        latarBelakangMiliter:  _.round((Number(v.latarBelakangMiliter) / v.total) * 100, 2),
        agamis:  _.round((Number(v.agamis) / v.total) * 100, 2),
    }))

    return persen
}