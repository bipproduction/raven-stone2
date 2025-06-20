'use server'
import { prisma } from "@/modules/_global"
import _ from "lodash"

/**
 * Get all data locked audience group by provinsi 
 * @returns array data locked audience
 */

export default async function funGetAllAudienceFront() {

    // get data audience
    const data = await prisma.audience.findMany()

    // group berdasarkan idProvinsi, kemudian value akan diakumulasikan
    const result = _.map(_.groupBy(data, "idProvinsi"), (v: any) => ({
        idProvinsi: v[0].idProvinsi,
        value: _.sumBy(v, 'value'),
    }))

    return result

}