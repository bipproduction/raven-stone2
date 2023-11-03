'use server'

import { prisma } from "@/modules/_global";
import moment from "moment";
import { revalidatePath } from "next/cache";

export default async function funUploadEmotionPaslon({ body }: { body: any }) {
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
            await prisma.paslonEmotion.create({
                data: {
                    idPaslon: pas,
                    dateEmotion: new Date(i.date),
                    timeEmotion: isoDateTime,
                    idKabkot: Number(i.idKabkot),
                    idProvinsi: Number(i.idProvinsi),
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
            await prisma.paslonEmotion.update({
                where: {
                    id: i.id
                },
                data: {
                    confidence: i.confidence,
                    supportive: i.supportive,
                    positive: i.positive,
                    undecided: i.undecided,
                    unsupportive: i.unsupportive,
                    uncomfortable: i.uncomfortable,
                    negative: i.negative,
                    dissapproval: i.dissapproval,
                }
            });
        }

    }

    revalidatePath('dashboard-admin/emotion-paslon?paslon=' + pas + '&date=' + date + '&prov=null')

    return {
        success: true,
        message: 'Sukses'
    }
}