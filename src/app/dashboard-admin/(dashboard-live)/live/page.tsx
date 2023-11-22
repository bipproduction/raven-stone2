import { ListDashboardLive } from "@/modules/dashboard_live";
import funGetAllNotification from "@/modules/dashboard_live/back/fun/get_all_notification";
import funGetAllPersen from "@/modules/dashboard_live/back/fun/get_all_persen";

export default async function Page() {
    const data = await funGetAllNotification()
    const dataPersen = await funGetAllPersen()
    return (
        <>
            <ListDashboardLive data={data} persen={dataPersen} />
        </>
    )
}