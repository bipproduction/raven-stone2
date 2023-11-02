'use server'

import { countProvince, prisma } from "@/modules/_global";
import _ from "lodash"

export default async function funDownloadPctByArea({ find }: { find: any }) {
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
        titleTrue = "PUBLIC CONCERN TREND - PROVINSI " + area?.name


    } else {
        kondisi = {}
        titleTrue = "PUBLIC CONCERN TREND - SELURUH PROVINSI "
    }


    dataTable = await prisma.publicConcernTrend.findMany({
        where: kondisi,
        select: {
            id: true,
            infrastruktur: true,
            keadilanSosial: true,
            kemiskinan: true,
            lapanganPekerjaan: true,
            layananKesehatan: true,
            pendidikan: true,
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
        },
        orderBy: {
            id: 'asc',
        }
    })

    dataTable = dataTable.map((v: any) => ({
        ..._.omit(v, ["infrastruktur", "keadilanSosial", "kemiskinan", "lapanganPekerjaan", "layananKesehatan", "pendidikan", "value", "AreaProvinsi", "AreaKabkot"]),
        Provinsi: v.AreaProvinsi.name,
        Kabkot: v.AreaKabkot.name,
        pendidikan: v.pendidikan,
        infrastruktur: v.infrastruktur,
        layananKesehatan: v.layananKesehatan,
        kemiskinan: v.kemiskinan,
        keadilanSosial: v.keadilanSosial,
        lapanganPekerjaan: v.lapanganPekerjaan,
    }))

    const allData = {
        title: titleTrue,
        data: dataTable
    }

    return allData
}