import { funGetAllCandidate, funGetOneCandidate } from "@/modules/_global";
import { ViewStep, funGetStepFront } from "@/modules/step";
import _ from "lodash";

export default async function Page() {

    const dataCandidate = await funGetAllCandidate()
    const data = await funGetStepFront({ candidate: 1 })
    const dataIsCandidate = await funGetOneCandidate({ candidate: 1 })
    return (
        <ViewStep
            kandidate={dataCandidate}
            stepCandidate={data}
            cCandidate={dataIsCandidate}
        />
    )
}