import { ViewEditRatePaslon, funGetDataEditRate } from "@/modules/national_popularity_metric";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: any } }) {
    const dataEdit = await funGetDataEditRate({ id: params.id })
    if (!dataEdit) return redirect('/dashboard-admin/rate-popularity')
    return (
        <>
            <ViewEditRatePaslon data={dataEdit} />
        </>
    )
}