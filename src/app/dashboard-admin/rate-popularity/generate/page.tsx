import { funGetAllPaslon } from "@/modules/_global";
import { ViewGenerateRate } from "@/modules/national_popularity_metric";

export default async function Page() {
    const dPaslon = await funGetAllPaslon()

    return (
        <><ViewGenerateRate paslon={dPaslon} /></>
    )
}
