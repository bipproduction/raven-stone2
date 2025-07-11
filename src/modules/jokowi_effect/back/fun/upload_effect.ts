'use server'

import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache";
import moment from "moment";


/**
 * Fungsi untuk upload Jokowi Effect.
 * @param {body} body - menampilkan body.
 * @returns Untuk upload Jokowi Effect
 */
export default async function funUploadEffect({ body }: { body: any }) {
    let date, y, isoDateTime
    for (let i of body) {
        date = moment(i.dateContent).format('YYYY-MM-DD');
        y = new Date('1970-01-01 ' + i.timeContent);
        isoDateTime = new Date(y.getTime() - (y.getTimezoneOffset() * 60000)).toISOString();


        if (i.id == '') {
            const cek = await prisma.effect.findFirst({
                where: {
                    dateContent: new Date(i.dateContent),
                    timeContent: isoDateTime,
                    isActive: true,
                    idCandidate: 7
                }
            });

            if (cek?.id) {
                await prisma.effect.update({
                    where: {
                        id: cek.id
                    },
                    data: {
                        dateContent: new Date(i.dateContent),
                        timeContent: isoDateTime,
                        content: String(i.content)
                    }
                });
            } else {
                await prisma.effect.create({
                    data: {
                        idCandidate: 7,
                        dateContent: new Date(i.dateContent),
                        timeContent: isoDateTime,
                        content: String(i.content)
                    }
                });
            }


        } else {
            await prisma.effect.update({
                where: {
                    id: i.id
                },
                data: {
                    dateContent: new Date(i.dateContent),
                    timeContent: isoDateTime,
                    content: String(i.content)
                }
            });
        }

    }

    revalidatePath('dashboard-admin/jokowi-effect?date=' + date)

    return {
        success: true,
        message: 'Sukses'
    }
}