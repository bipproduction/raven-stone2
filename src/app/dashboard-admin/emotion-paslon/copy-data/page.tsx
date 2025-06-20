import { funGetAllPaslon } from "@/modules/_global";
import { ViewCopyEmotionPaslon } from "@/modules/emotion";

export default async function Page() {
    const dPaslon = await funGetAllPaslon()

    return (
        <><ViewCopyEmotionPaslon paslon={dPaslon} /></>
    )
}