import { cookies } from "next/headers"
import _ from "lodash"
import { redirect } from "next/navigation"
import { funCekAkses } from "@/modules/_global"
import { DashboardLive, ViewDahsboardLive2, funGetAllNotif, funGetPersenLiveFront } from "@/modules/dashboard_live"
import { funGetEmotionPersenPaslonFront, funGetKabkotEmotionPaslon, funGetProvinsiEmotionPaslon } from "@/modules/emotion"
import { unsealData } from "iron-session"
import { pwd_key_config } from "@/modules/_global/bin/val_global"

export default async function Page() {
    const c = cookies().get("_tknRV")
    if (!c || !c.value || _.isEmpty(c.value)) return redirect('/')

    const dataCookies = await unsealData(c.value, { password: pwd_key_config as string })
    if (_.isEmpty(dataCookies)) return redirect('/')

    const cekAkses: any = await funCekAkses()

    if (!cekAkses)
        if (cekAkses && !cekAkses.dashboardUser && cekAkses!.dashboardAdmin) return redirect('/dashboard-admin/emotion-candidate')

    const dataPersen = await funGetPersenLiveFront()
    const dataNotif = await funGetAllNotif()
    const dataEmotionPersen = await funGetEmotionPersenPaslonFront()
    const dataProv = await funGetProvinsiEmotionPaslon()
    const dataKab = await funGetKabkotEmotionPaslon()

    return (
        <>
            {/* <DashboardLive dataPersen={dataPersen} dataNotif={dataNotif} emotionPersen={dataEmotionPersen} dataProvinsi={dataProv} dataKabkot={dataKab} /> */}
            <ViewDahsboardLive2 dataPersen={dataPersen} dataNotif={dataNotif} emotionPersen={dataEmotionPersen} dataProvinsi={dataProv} dataKabkot={dataKab} />
        </>
    )
}