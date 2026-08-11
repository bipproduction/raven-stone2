import { funGetAllPaslon } from "@/modules/_global";
import { ViewGenerateEmotionPaslon } from "@/modules/emotion";

export default async function Page() {
    const dPaslon = await funGetAllPaslon()

    return (
        <><ViewGenerateEmotionPaslon paslon={dPaslon} /></>
    )
}
