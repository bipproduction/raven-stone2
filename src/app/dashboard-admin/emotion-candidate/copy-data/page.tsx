import { funGetAllCandidate } from "@/modules/_global";
import { ViewCopyEmotionCandidate } from "@/modules/emotion";

export default async function Page() {
    const dCandidate = await funGetAllCandidate()

    return (
        <><ViewCopyEmotionCandidate candidate={dCandidate} /></>
    )
}