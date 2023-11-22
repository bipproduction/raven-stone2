import { EditNotification } from "@/modules/dashboard_live";
import funGetOneNotification from "@/modules/dashboard_live/back/fun/get_one_notification";

export default async function Page({ params }: { params: { id: string } }) {
    const data = await funGetOneNotification({id: params.id})
    return (
        <>
            <EditNotification data={data} />
        </>
    )
}