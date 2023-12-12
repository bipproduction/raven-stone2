'use server'

import { countProvince, prisma } from "@/modules/_global";
import _ from "lodash"


/**
 * Fungsi untuk get leader trait assessment by area.
 * @param {find} find - menampilkan find.
 * @returns Untuk get leader trait assessment by area
 */
export default async function funGetLtaByArea({ find }: { find: any }) {
    let titleTrue, dataTable = <any>[], area, th

    const nProv = await countProvince();

    if (find.idProvinsi > 0 && find.idProvinsi <= nProv) {
        dataTable = await prisma.leaderTraitAssessment.findMany({
            where: {
                idProvinsi: find.idProvinsi
            },
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
                idKabkot: true,
                AreaKabkot: {
                    select: {
                        name: true
                    }
                }
            }
        })

        dataTable = dataTable.map((v: any) => ({
            ..._.omit(v, ["AreaKabkot"]),
            name: v.AreaKabkot.name
        }))

        area = await prisma.areaProvinsi.findUnique({
            where: {
                id: find.idProvinsi
            }
        })
        titleTrue = "PROVINSI " + area?.name
        th = "KABUPATEN/KOTA"



    } else {
        dataTable = await prisma.leaderTraitAssessment.findMany({
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

        dataTable = dataTable.map((v: any) => ({
            ..._.omit(v, ["AreaProvinsi"]),
            name: v.AreaProvinsi.name
        }))

        dataTable = _.map(_.groupBy(dataTable, "idProvinsi"), (v: any) => ({
            pekerjaKeras: _.sumBy(v, 'pekerjaKeras'),
            cerdas: _.sumBy(v, 'cerdas'),
            jujur: _.sumBy(v, 'jujur'),
            merakyat: _.sumBy(v, 'merakyat'),
            tegas: _.sumBy(v, 'tegas'),
            berpengalamanMemimpin: _.sumBy(v, 'berpengalamanMemimpin'),
            berprestasi: _.sumBy(v, 'berprestasi'),
            latarBelakangMiliter: _.sumBy(v, 'latarBelakangMiliter'),
            agamis: _.sumBy(v, 'agamis'),
            name: v[0].name
        }))

        titleTrue = "SELURUH PROVINSI "
        th = "PROVINSI"
    }

    const allData = {
        title: titleTrue,
        thTitle: th,
        data: dataTable,
    }



    return allData
}