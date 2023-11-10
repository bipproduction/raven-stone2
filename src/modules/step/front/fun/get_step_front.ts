"use server"

import { prisma } from "@/modules/_global"
import _ from "lodash";

export default async function funGetStepFront({ candidate }: { candidate: any }) {

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

    const allData = {
        social: result.filter((v: any) => v.category === "SOCIAL"),
        technology: result.filter((v: any) => v.category === "TECHNOLOGY"),
        economy: result.filter((v: any) => v.category === "ECONOMY"),
        politic: result.filter((v: any) => v.category === "POLITIC")
    }

    return allData

}