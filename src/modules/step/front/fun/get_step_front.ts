"use server"

import { prisma } from "@/modules/_global"
import _ from "lodash";

/**
 * Fungsi untuk menampilkan step by candidate.
 * @param {candidate} candidate - menampilakan candidate.
 * @returns {candidate} Proses ini untuk menampilkan data step by candidate.
 */
export default async function funGetStepFront({ candidate }: { candidate: any }) {

    let allData={}

    // proses menampilkan data step
    // data tersebut terdapat di dalam select
    const result = await prisma.step.findMany({
        where: {
            idCandidate: Number(candidate),
            isActive: true,
        },
        select: {
            category: true,
            content: true,
            sentiment: true
        }
    })

    if (!_.isEmpty(result)) {
        allData = {
            social: result.filter((v: any) => v.category === "SOCIAL"),
            technology: result.filter((v: any) => v.category === "TECHNOLOGY"),
            economy: result.filter((v: any) => v.category === "ECONOMY"),
            politic: result.filter((v: any) => v.category === "POLITIC")
        }
    }

    // proses pengembalian allData
    return allData

}