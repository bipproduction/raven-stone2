'use server'
import { prisma } from "@/modules/_global"
import _ from "lodash"
import moment from "moment"

/**
 * Fungsi untuk get emotion candidate chart front.
 * @param {candidate} candidate - menampilkan candidate.
 * @param {startDate} startDate - menampilkan startDate.
 * @returns Untuk  get emotion candidate chart front
 */

export default async function funGetEmotionCandidateChartFront({ candidate, startDate, endDate }: { candidate: any, startDate: any, endDate: any }) {
    const jamNow = new Date().getHours() + 1 + ':00:00'
    const IniisoDateTime = new Date(new Date('1970-01-01 ' + jamNow).getTime() - (new Date('1970-01-01 ' + jamNow).getTimezoneOffset() * 60000)).toISOString()

    const getDate = await prisma.candidateEmotion.groupBy({
        by: ['dateEmotion'],
        orderBy: {
            dateEmotion: 'asc'
        },
        where: {
            idCandidate: Number(candidate),
            dateEmotion: {
                gte: new Date(startDate),
                lte: new Date(endDate),
            }
        }
    })

    let dataDateTime: { date: any, time: any }[] = []
    let kondisinya

    for (let i = 0; i < getDate.length; i++) {
        if (moment(getDate[i].dateEmotion).format('YYYY-MM-DD') == moment(new Date()).format('YYYY-MM-DD')) {
            kondisinya = {
                idCandidate: Number(candidate),
                dateEmotion: getDate[i].dateEmotion,
                timeEmotion: {
                    lt: IniisoDateTime
                }
            }
        } else {
            kondisinya = {
                idCandidate: Number(candidate),
                dateEmotion: getDate[i].dateEmotion
            }
        }

        const getDateTime = await prisma.candidateEmotion.groupBy({
            by: ['timeEmotion'],
            orderBy: {
                timeEmotion: 'desc'
            },
            where: kondisinya
        })

        dataDateTime.push({ date: getDate[i]?.dateEmotion, time: getDateTime[0]?.timeEmotion })
    }

    let dataMentah = []
    for (let i = 0; i < dataDateTime.length; i++) {
        // klo ga ada data di terakhir 
        if (!_.isUndefined(dataDateTime[i].time)) {
            const find = await prisma.candidateEmotion.findMany({
                where: {
                    idCandidate: Number(candidate),
                    dateEmotion: dataDateTime[i].date,
                    timeEmotion: dataDateTime[i].time
                }
            })

            dataMentah.push(find)
        }
    }

    const dataMentah2 = dataMentah.flat()
    // const data = await prisma.paslonEmotion.findMany({
    //     where: {
    //         idCandidate: Number(paslon),
    //         dateEmotion: {
    //             gte: new Date(startDate),
    //             lte: new Date(endDate),
    //         }
    //     },
    //     orderBy: {
    //         dateEmotion: 'asc'
    //     }
    // })

    const groupedData = _.groupBy(dataMentah2, (d: any) => d.dateEmotion.toDateString());


    const result = Object.keys(groupedData).map((dateStr) => {
        const sentimentData = groupedData[dateStr];

        const sum = sentimentData.reduce(
            (result: any, value: any) => ({
                confidence: result.confidence + value.confidence,
                supportive: result.supportive + value.supportive,
                positive: result.positive + value.positive,
                undecided: result.undecided + value.undecided,
                unsupportive: result.unsupportive + value.unsupportive,
                uncomfortable: result.uncomfortable + value.uncomfortable,
                negative: result.negative + value.negative,
                dissapproval: result.dissapproval + value.dissapproval
            }),
            {
                confidence: 0,
                supportive: 0,
                positive: 0,
                undecided: 0,
                unsupportive: 0,
                uncomfortable: 0,
                negative: 0,
                dissapproval: 0
            }
        );

        const totalSum = _.sum(Object.values(sum));

        const positive = _.round(((sum.confidence + sum.supportive + sum.positive) / totalSum) * 100, 2);
        const neutral = _.round((sum.undecided / totalSum) * 100, 2);
        const negative = _.round(((sum.unsupportive + sum.uncomfortable + sum.negative + sum.dissapproval) / totalSum) * 100, 2);

        return {
            date: moment(dateStr).format('DD-MM-YYYY'),
            positive,
            neutral,
            negative
        };
    });

    return result

}