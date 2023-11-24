import { funGetAllCandidate } from "@/modules/_global";
import { ViewAddStep } from "@/modules/step";

export default async function Page() {
    const dCandidate = await funGetAllCandidate()

    return (
        <><ViewAddStep candidate={dCandidate}/></>
    )
}