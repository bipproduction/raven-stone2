'use server'

import { countProvince, prisma } from "@/modules/_global";
import _ from "lodash"


/**
 * Fungsi untuk Download function download Rhi By Area.
 * @param {find} find - menampilkan find.
 * @returns Untuk Download function download Rhi By Area
 */
export default async function funDownloadRhiByArea({ find }: { find: any }) {
    let titleTrue, dataTable = <any>[], area

    const nProv = await countProvince();

    if (find.idProvinsi > 0 && find.idProvinsi <= nProv) {
        dataTable = await prisma.regionHotIssues.findMany({
            where: {
                idProvinsi: find.idProvinsi,
            },
            select: {
                id: true,
                description: true,
                AreaKabkot: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                idKabkot: 'asc'
            }
        })

        dataTable = dataTable.map((v: any) => ({
            ..._.omit(v, ["description", "AreaKabkot"]),
            Kabkot: v.AreaKabkot.name,
            description: v.description
        }))

        area = await prisma.areaProvinsi.findUnique({
            where: {
                id: find.idProvinsi
            }
        })
        titleTrue = "REGION HOT ISSUES - PROVINSI " + area?.name


    } else {
        titleTrue = null
        dataTable = []
    }

    const allData = {
        title: titleTrue,
        data: dataTable
    }

    return allData
}