import { funGetAllPaslon, funGetOnePaslon } from "@/modules/_global";
import { ViewMlAi, funGetDateMlAiFront, funGetMlaiFront } from "@/modules/ml_ai";

export default async function Page() {

    const dataMlAi = await funGetMlaiFront({ isPaslon: 1, isDate: new Date() })
    const dataPaslon = await funGetAllPaslon()
    const onePaslon = await funGetOnePaslon({ paslon: 1 })
    const tanggal = await funGetDateMlAiFront({ isPaslon: 1, date: new Date() })

    return (
        <ViewMlAi data={dataMlAi} dataTanggal={tanggal} paslon={dataPaslon} cpaslon={onePaslon} />
    )
}