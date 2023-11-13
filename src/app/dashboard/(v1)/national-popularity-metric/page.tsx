import { funGetAllPaslon, funGetOnePaslon } from "@/modules/_global";
import { ViewNationalPopularityMetric, funGetOnePopularityFront } from "@/modules/national_popularity_metric";

export default async function Page() {
    const dPaslon = await funGetAllPaslon()
    const cPaslon = await funGetOnePaslon({ paslon: 1 })
    const dNow = await funGetOnePopularityFront({ paslon: 1 })

    return (
        <ViewNationalPopularityMetric cpaslon={cPaslon} paslon={dPaslon} dataNow={dNow} />
    )
}