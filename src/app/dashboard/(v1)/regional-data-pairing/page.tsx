import { funGetAllPaslon, funGetAllProvince, funGetOnePaslon } from "@/modules/_global";
import { funGetAllAudienceFront } from "@/modules/audience";
import { funGetRateFront } from "@/modules/national_popularity_metric";
import { ViewaPairing, funGetPairingFront } from "@/modules/pairing";

export default async function Page() {

    const dPaslon = await funGetAllPaslon()
    const dProvinsi = await funGetAllProvince()
    const dAudience = await funGetAllAudienceFront()
    const dataDB = await funGetPairingFront({ paslon: 1 })
    const onePaslon = await funGetOnePaslon({ paslon: 1 })
    const dRate = await funGetRateFront({ paslon: 1 })

    return (
        <ViewaPairing paslon={dPaslon} provinsi={dProvinsi} cpaslon={onePaslon} data={dataDB} audience={dAudience} rate={dRate} />
    )
}