import { EditNotification } from "@/modules/dashboard_live";

export default function Page({ params }: { params: { id: string } }) {
    return (
        <>
            <EditNotification data={params.id} />
        </>
    )
}