"use server"

import { prisma } from "@/modules/_global"
import _ from "lodash"

export default async function funGetOneRhi({ id }: { id: any }) {
    const data = await prisma.regionHotIssues.findUnique({
        where: {
            id: Number(id)
        },
        select: {
            id: true,
            description: true,
            AreaProvinsi: {
                select: {
                    name: true
                }
            },
            AreaKabkot: {
                select: {
                    name: true
                }
            }
        }
    })

    const result = {
        id: data?.id,
        description: data?.description,
        areaProvinsi: _.isUndefined(data?.AreaProvinsi?.name) ? null : data?.AreaProvinsi?.name,
        areaKabkot: _.isUndefined(data?.AreaKabkot?.name) ? null : data?.AreaKabkot?.name,
    }

    return result
}