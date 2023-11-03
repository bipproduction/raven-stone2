'use server'

import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache";
import moment from "moment";

export default async function funUploadMlai({ body }: { body: any }) {
    let pas, date
    for (let i of body) {
        pas = Number(i.idPaslon)
        date = moment(i.dateContent).format('YYYY-MM-DD');
        if (i.id == '') {
            console.log(new Date('1970-01-01 '+i.timeContent).getHours())
            
            await prisma.mlAi.create({
                data: {
                    idPaslon: Number(i.idPaslon),
                    dateContent: new Date(i.dateContent),
                    timeContent: (new Date()).toISOString(),
                    content: String(i.content)
                }
            });
        } else {
            await prisma.mlAi.update({
                where: {
                    id: Number(i.id)
                },
                data: {
                    idPaslon: Number(i.idPaslon),
                    dateContent: new Date(i.dateContent),
                    timeContent: i.timeContent,
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