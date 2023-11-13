import { funGetAllPaslon, funGetOnePaslon } from "@/modules/_global";
import { ViewMlAi, funGetMlaiFront } from "@/modules/ml_ai";

export default async function Page() {

    const dataMlAi = await funGetMlaiFront({ isPaslon: 1, isDate: new Date() })
    const dataPaslon = await funGetAllPaslon()
    const onePaslon = await funGetOnePaslon({paslon:1})

    return (
        <ViewMlAi data={dataMlAi} paslon={dataPaslon} cpaslon={onePaslon}/>
    )
}