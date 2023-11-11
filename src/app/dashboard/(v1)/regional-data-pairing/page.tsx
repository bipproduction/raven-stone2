import { funGetAllPaslon, funGetAllProvince, funGetOnePaslon } from "@/modules/_global";
import { ViewaPairing, funGetPairingFront } from "@/modules/pairing";

export default async function Page() {

    const dPaslon = await funGetAllPaslon()
    const dProvinsi = await funGetAllProvince()
    const dataDB = await funGetPairingFront({ paslon: 1 })
    const onePaslon = await funGetOnePaslon({paslon:1})

    return (
        <ViewaPairing paslon={dPaslon} provinsi={dProvinsi} cpaslon={onePaslon} data={dataDB}/>
    )
}