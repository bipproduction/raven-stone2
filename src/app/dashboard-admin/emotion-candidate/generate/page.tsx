import { funGetAllCandidate } from "@/modules/_global";
import { ViewGenerateEmotionCandidate } from "@/modules/emotion";

export default async function Page() {
    const dCandidate = await funGetAllCandidate()

    return (
        <><ViewGenerateEmotionCandidate candidate={dCandidate} /></>
    )
}
