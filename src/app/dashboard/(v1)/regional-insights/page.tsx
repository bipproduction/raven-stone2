import { funGetAllCandidate, funGetAllProvince } from "@/modules/_global";
import { funGetAllAudienceFront } from "@/modules/audience";
import { funGetEmotionRegionalFront } from "@/modules/emotion";
import { funGetLtaFrontProv } from "@/modules/leader_trait_assessment";
import { funGetPctFrontProv } from "@/modules/public_concern_trend";
import { ViewRegionalInsights } from "@/modules/regional_insights";

export default async function Page() {

    const dCandidate = await funGetAllCandidate()
    const dProvinsi = await funGetAllProvince()
    const dAudience = await funGetAllAudienceFront()
    const dataDB = await funGetEmotionRegionalFront({ candidate: 1 })
    const dPct = await funGetPctFrontProv()
    const dLta = await funGetLtaFrontProv()


    return (
        <>
            <ViewRegionalInsights candidate={dCandidate} provinsi={dProvinsi} audience={dAudience} emotion={dataDB} pct={dPct} lta={dLta} />
        </>
    )
}