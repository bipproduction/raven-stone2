import { funGetAllPaslon } from "@/modules/_global";
import { ViewGenerateMlai } from "@/modules/ml_ai";

export default async function Page() {
    const dataPaslon = await funGetAllPaslon()

    return (
        <><ViewGenerateMlai paslon={dataPaslon} /></>
    )
}
