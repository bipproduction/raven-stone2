'use server'

import { prisma } from "@/modules/_global"
import _ from "lodash"

export default async function funGetLockedAudience({ provinsi }: { provinsi: any }) {
    const data = await prisma.audience.findMany({
        where: {
            idProvinsi: Number(provinsi)
        }
    })

    const result = _.map(_.groupBy(data, "idProvinsi"), (v: any) => ({
        value: _.sumBy(v, 'value'),
    }))

    // console.log('audience', provinsi)

    return result

}