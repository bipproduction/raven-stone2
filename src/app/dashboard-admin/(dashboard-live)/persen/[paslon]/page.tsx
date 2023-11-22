import { funGetAllPaslon } from "@/modules/_global";
import { EditPersen } from "@/modules/dashboard_live";
import funGetOnePersen from "@/modules/dashboard_live/back/fun/get_one_persen";

export default async function Page({ params }: { params: { paslon: string } }) {
    const data = await funGetOnePersen({id: params.paslon})
    return (
        <>
        <EditPersen data={data}/>
        </>
    )
}