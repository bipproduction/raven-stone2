import { cookies } from "next/headers"
import _ from "lodash"
import { redirect } from "next/navigation"
import { funCekAkses } from "@/modules/_global"
import { DashboardLive, funGetAllNotif, funGetPersenLiveFront } from "@/modules/dashboard_live"

export default async function Page() {
    const c = cookies().get("_tknRV")
    if (!c || !c.value || _.isEmpty(c.value)) return redirect('/')

    const cekAkses = await funCekAkses()
    if (!cekAkses.dashboardUser && cekAkses.dashboardAdmin) return redirect('/dashboard-admin/emotion-candidate')

    const dataPersen = await funGetPersenLiveFront()
    const dataNotif = await funGetAllNotif()

    return (
        <>
            <DashboardLive dataPersen={dataPersen} dataNotif={dataNotif} />
        </>
    )
}