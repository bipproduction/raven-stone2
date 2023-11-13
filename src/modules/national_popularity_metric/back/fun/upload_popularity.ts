'use server'

import { prisma } from "@/modules/_global";
import moment from "moment";
import { revalidatePath } from "next/cache";

export default async function funUploadPopularity({ body }: { body: any }) {
    let date, isoDateTime, y, pas

    for (let i of body) {
        date = moment(i.date).format('YYYY-MM-DD');
        y = new Date('1970-01-01 ' + i.time);
        isoDateTime = new Date(y.getTime() - (y.getTimezoneOffset() * 60000)).toISOString();
        pas = Number(i.idPaslon)


        if (i.id == '') {
            // const cek = await prisma.effect.findFirst({
            //     where: {
            //         dateContent: new Date(i.dateContent),
            //         timeContent: isoDateTime,
            //         isActive: true,
            //         idCandidate: 7
            //     }
            // });

            // if (cek?.id) {
            //     await prisma.effect.update({
            //         where: {
            //             id: cek.id
            //         },
            //         data: {
            //             dateContent: new Date(i.dateContent),
            //             timeContent: isoDateTime,
            //             content: String(i.content)
            //         }
            //     });
            // } else {
            await prisma.paslonPopularity.create({
                data: {
                    idPaslon: pas,
                    dateEmotion: new Date(i.date),
                    timeEmotion: isoDateTime,
                    rate: Number(i.rate),
                    confidence: Number(i.confidence),
                    supportive: Number(i.supportive),
                    positive: Number(i.positive),
                    undecided: Number(i.undecided),
                    unsupportive: Number(i.unsupportive),
                    uncomfortable: Number(i.uncomfortable),
                    negative: Number(i.negative),
                    dissapproval: Number(i.dissapproval)
                }
            });
            // }


        } else {
            await prisma.paslonPopularity.update({
                where: {
                    id: i.id
                },
                data: {
                    rate: Number(i.rate),
                    confidence: Number(i.confidence),
                    supportive: Number(i.supportive),
                    positive: Number(i.positive),
                    undecided: Number(i.undecided),
                    unsupportive: Number(i.unsupportive),
                    uncomfortable: Number(i.uncomfortable),
                    negative: Number(i.negative),
                    dissapproval: Number(i.dissapproval),
                }
            });
        }

    }

    revalidatePath('dashboard-admin/national-popularity-metric?date=' + date)

    return {
        success: true,
        message: 'Sukses'
    }
}