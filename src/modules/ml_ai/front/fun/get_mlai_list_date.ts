'use server'
import prisma from "@/modules/_global/bin/prisma"
import _ from "lodash"
import moment from "moment"

export default async function funGetDateMlAiFront({ isPaslon, date }: { isPaslon: any, date: any }) {

      const awalDate = moment(date).format('YYYY-MM') + '-01'
      const akhirDate = moment(new Date(new Date(awalDate).setMonth(date.getMonth() + 1))).format('YYYY-MM-DD')

      const data = await prisma.mlAi.findMany({
         where: {
            isActive: true,
            idPaslon: Number(isPaslon),
            dateContent: {
               gte: new Date(awalDate),
               lte: new Date(akhirDate),
            }
         }
      })

      const dataGroup = _.map(_.groupBy(data, "dateContent"), (v: any) => ({
         dateContent: v[0].dateContent
      }))

      const result = dataGroup.map(a => moment(a.dateContent).format('YYYY-MM-DD'));

      return result
}