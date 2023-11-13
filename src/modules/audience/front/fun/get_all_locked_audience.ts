'use server'

import { prisma } from "@/modules/_global"
import _ from "lodash"

export default async function funGetAllAudienceFront() {
    const data = await prisma.audience.findMany()

    const result = _.map(_.groupBy(data, "idProvinsi"), (v: any) => ({
        idProvinsi: v[0].idProvinsi,
        value: _.sumBy(v, 'value'),
    }))


    return result

}