import { funGetAllCandidate } from "@/modules/_global";
import { ViewGenerateSwot } from "@/modules/swot";

export default async function Page() {
    const dataCan = await funGetAllCandidate()

    return (
        <><ViewGenerateSwot candidate={dataCan} /></>
    )
}
