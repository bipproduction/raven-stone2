import { funGetAllCandidate } from "@/modules/_global";
import { ViewStep } from "@/modules/step";
import getBayCandidateStep from "@/modules/step/front/fun/get_by_candidate";
import _ from "lodash";

export default async function Page({searchParams}: {searchParams: {candidate: string}}){
    const datastep = {
        idCandidate: (_.isNaN(Number(searchParams.candidate)) ? 1 : Number(searchParams.candidate)),
    }
    const dataCandidate = await funGetAllCandidate()
    const data = await getBayCandidateStep({candidate: datastep.idCandidate})
    return(
        <ViewStep 
        params={datastep}
        kandidate={dataCandidate}
        stepCandidate= {data}
        />
    )
}