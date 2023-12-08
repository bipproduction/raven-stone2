'use server'
import { countProvince, prisma } from "@/modules/_global";
import _ from "lodash"

/**
 * Get data download audience berdasarkan area yg dipilih
 * @param find array yang berisikan id provinsi
 * @returns array judul dan data audience
 */

export default async function funDownloadAudienceByArea({ find }: { find: any }) {
    let titleTrue, dataTable = <any>[], area, kondisi

    // get jumlah provinsi
    const nProv = await countProvince();

    if (find.idProvinsi > 0 && find.idProvinsi <= nProv) {
        // jika parameter id provinsi > 0 dan <= dari jumlah provinsi,
        // maka kondisi = provinsiid 
        kondisi = {
            idProvinsi: find.idProvinsi
        }

        // get data provinsi berdasarkan id provinsi parameter
        area = await prisma.areaProvinsi.findUnique({
            where: {
                id: find.idProvinsi
            }
        })

        // set judul
        titleTrue = "AUDIENCE - PROVINSI " + area?.name

    } else {
        // selain itu,
        // maka variable kondisi di setting dg array kosong
        kondisi = {}

        // set judul
        titleTrue = "AUDIENCE - SELURUH PROVINSI "
    }

    // get data audience sesuai dg variable kondisi
    dataTable = await prisma.audience.findMany({
        where: kondisi,
        select: {
            id: true,
            value: true,
            AreaProvinsi: {
                select: {
                    name: true,
                }
            },
            AreaKabkot: {
                select: {
                    name: true,
                }
            }
        },
        orderBy: {
            id: 'asc',
        }
    })

    // omit data
    dataTable = dataTable.map((v: any) => ({
        ..._.omit(v, ["value", "AreaProvinsi", "AreaKabkot"]),
        Provinsi: v.AreaProvinsi.name,
        Kabkot: v.AreaKabkot.name,
        value: v.value
    }))

    // set data return
    const allData = {
        title: titleTrue,
        data: dataTable
    }

    return allData
}