import { ListDashboardLive } from "@/modules/dashboard_live";
import funGetAllNotification from "@/modules/dashboard_live/back/fun/get_all_notification";

export default async function Page() {
    const data = await funGetAllNotification()
    return (
        <>
            <ListDashboardLive data={data} />
        </>
    )
}