'use server'
import { countProvince, prisma } from "@/modules/_global";
import _ from "lodash"

/**
 * Fungsi untuk get function get rhi by area.
 * @param {find} find - menampilkan find.
 * @returns Untuk get function get rhi by area
 */

export default async function funGetRhiByArea({ find }: { find: any }) {
    let titleTrue, dataTable = <any>[], area, th

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
        titleTrue = null;
        dataTable = [];
        th = null
    }

    const allData = {
        title: titleTrue,
        thTitle: th,
        data: dataTable
    }


    return allData
}