'use server'

import { prisma } from "@/modules/_global"
import _ from "lodash"
import moment from "moment"

export default async function funGetEmotionCandidateChartFront({ candidate, startDate, endDate }: { candidate: any, startDate: any, endDate: any }) {
    const jamNow = new Date().getHours() + 1 + ':00:00'
    const IniisoDateTime = new Date(new Date('1970-01-01 ' + jamNow).getTime() - (new Date('1970-01-01 ' + jamNow).getTimezoneOffset() * 60000)).toISOString()

    const data = await prisma.candidateEmotion.findMany({
        where: {
            idCandidate: Number(candidate),
            dateEmotion: {
                gte: new Date(startDate),
                lte: new Date(endDate),
            }
        },
        orderBy: {
            dateEmotion: 'asc'
        }
    })

    const groupedData = _.groupBy(data, (d: any) => d.dateEmotion.toDateString());

    const result = Object.keys(groupedData).map((dateStr) => {
        const sentimentData = groupedData[dateStr];

        const sum = sentimentData.reduce(
            (result: any, value) => ({
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
            date: dateStr,
            positive,
            neutral,
            negative
        };
    });

    return result

}