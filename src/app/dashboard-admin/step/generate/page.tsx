import { funGetAllCandidate } from "@/modules/_global";
import { ViewGenerateStep } from "@/modules/step";

export default async function Page() {
    const dataCan = await funGetAllCandidate()

    return (
        <><ViewGenerateStep candidate={dataCan} /></>
    )
}
