import { EditPersen } from "@/modules/dashboard_live";

export default function Page({ params }: { params: { paslon: string } }) {
    return (
        <>
        <EditPersen data={params.paslon}/>
        </>
    )
}