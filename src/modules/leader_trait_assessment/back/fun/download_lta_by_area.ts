'use server'

import { countProvince, prisma } from "@/modules/_global";
import _ from "lodash"

/**
 * Fungsi untuk download leader trait assessment by area.
 * @param {find} find - menampilkan find.
 * @returns Untuk download leader trait assessment by area
 */
export default async function funDownloadLtaByArea({ find }: { find: any }) {
    let titleTrue, dataTable = <any>[], area, kondisi

    const nProv = await countProvince();

    if (find.idProvinsi > 0 && find.idProvinsi <= nProv) {
        kondisi = {
            idProvinsi: find.idProvinsi
        }

        area = await prisma.areaProvinsi.findUnique({
            where: {
                id: find.idProvinsi
            }
        })
        titleTrue = "LEADER TRAIT ASSESSMENT - PROVINSI " + area?.name
    } else {
        kondisi = {}

        titleTrue = "LEADER TRAIT ASSESSMENT - SELURUH PROVINSI "
    }


    dataTable = await prisma.leaderTraitAssessment.findMany({
        where: kondisi,
        select: {
            id: true,
            AreaProvinsi: {
                select: {
                    name: true,
                }
            },
            AreaKabkot: {
                select: {
                    name: true,
                }
            },
            pekerjaKeras: true,
            cerdas: true,
            jujur: true,
            merakyat: true,
            tegas: true,
            berpengalamanMemimpin: true,
            berprestasi: true,
            latarBelakangMiliter: true,
            agamis: true,
        },
        orderBy: {
            id: 'asc',
        }
    })

    dataTable = dataTable.map((v: any) => ({
        ..._.omit(v, ["pekerjaKeras", "cerdas", "jujur", "merakyat", "tegas", "berpengalamanMemimpin", "berprestasi", "latarBelakangMiliter", "agamis", "AreaProvinsi", "AreaKabkot"]),
        Provinsi: v.AreaProvinsi.name,
        Kabkot: v.AreaKabkot.name,
        pekerjaKeras: v.pekerjaKeras,
        cerdas: v.cerdas,
        jujur: v.jujur,
        merakyat: v.merakyat,
        tegas: v.tegas,
        berpengalamanMemimpin: v.berpengalamanMemimpin,
        berprestasi: v.berprestasi,
        latarBelakangMiliter: v.latarBelakangMiliter,
        agamis: v.agamis,
    }))

    const allData = {
        title: titleTrue,
        data: dataTable
    }

    return allData
}