'use server'

import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache";
import moment from "moment";


/**
 * Fungsi untuk upload ml ai.
 * @param {body} body - menampilkan body.
 * @returns Untuk upload ml ai
 */
export default async function funUploadMlai({ body }: { body: any }) {
    let pas, date, y, isoDateTime, cek
    for (let i of body) {
        pas = Number(i.idPaslon)
        date = moment(i.dateContent).format('YYYY-MM-DD');
        y = new Date('1970-01-01 ' + i.timeContent);
        isoDateTime = new Date(y.getTime() - (y.getTimezoneOffset() * 60000)).toISOString();

        if (i.id == '') {
             cek = await prisma.mlAi.findFirst({
                where: {
                    dateContent: new Date(i.dateContent),
                    timeContent: isoDateTime,
                    isActive: true,
                    idPaslon: pas
                }
            });

            if (cek?.id) {
                await prisma.mlAi.update({
                    where: {
                        id: cek.id
                    },
                    data: {
                        idPaslon: pas,
                        dateContent: new Date(i.dateContent),
                        timeContent: isoDateTime,
                        content: String(i.content)
                    }
                });
            } else {
                await prisma.mlAi.create({
                    data: {
                        idPaslon: pas,
                        dateContent: new Date(i.dateContent),
                        timeContent: isoDateTime,
                        content: String(i.content)
                    }
                });
            }

        } else {
            await prisma.mlAi.update({
                where: {
                    id: i.id
                },
                data: {
                    idPaslon: pas,
                    dateContent: new Date(i.dateContent),
                    timeContent: isoDateTime,
                    content: String(i.content)
                }
            });
        }

    }

    revalidatePath('dashboard-admin/ml-ai?paslon=' + pas + '&date=' + date)

    return {
        success: true,
        message: 'Sukses'
    }
}