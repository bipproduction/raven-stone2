import { funGetAllCandidate, funGetOneCandidate } from "@/modules/_global";
import { ViewSwot, funGetSwotFront } from "@/modules/swot";

export default async function Page() {

    const dataSwot = await funGetSwotFront({ candidate: 1 })
    const dataCandidate = await funGetAllCandidate()
    const dataIsCandidate = await funGetOneCandidate({ candidate: 1 })

    return (
        <ViewSwot swot={dataSwot} candidate={dataCandidate} cCandidate={dataIsCandidate} />
    )
}