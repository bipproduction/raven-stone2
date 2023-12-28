'use server'
import { prisma } from "@/modules/_global"
import _ from "lodash"

/**
 * Fungsi untuk get leader trait assessment kabupaten.
 * @param {provinsi} provinsi - menampilkan provinsi.
 * @returns Untuk get leader trait assessment kabupaten
 */

export default async function funGetLtaFrontKab({ provinsi }: { provinsi: any }) {
    const data = await prisma.leaderTraitAssessment.findMany({
        where: {
            idProvinsi: Number(provinsi)
        }
    })

    const total = data.map((v: any) => ({
        idKabkot: v.idKabkot,
        total: _.sum([
            v.pekerjaKeras,
            v.cerdas,
            v.jujur,
            v.merakyat,
            v.tegas,
            v.berpengalamanMemimpin,
            v.berprestasi,
            v.latarBelakangMiliter,
            v.agamis,
        ]),
        pekerjaKeras: v.pekerjaKeras,
        cerdas:  v.cerdas,
        jujur:  v.jujur,
        merakyat:  v.merakyat,
        tegas:  v.tegas,
        berpengalamanMemimpin:  v.berpengalamanMemimpin,
        berprestasi:  v.berprestasi,
        latarBelakangMiliter:  v.latarBelakangMiliter,
        agamis:  v.agamis,
    }))

    const persen = total.map((v: any) => ({
        idKabkot: v.idKabkot,
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