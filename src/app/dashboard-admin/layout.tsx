import { LayoutAdmin, funCekAkses, funGetAccessAdmin } from "@/modules/_global";
import { cookies } from "next/headers";
import _ from "lodash"
import { unsealData } from "iron-session";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const c = cookies().get("_tknRV")
    if (!c || !c.value || _.isEmpty(c.value)) return redirect('/')

    const dataCookies = await unsealData(c.value, { password: process.env.PWD as string })
    const cekAkses = await funCekAkses()
    if(cekAkses.dashboardUser && !cekAkses.dashboardAdmin)  return redirect('/dashboard/summary')

    const dMenu = await funGetAccessAdmin();

    return (
        <>
            <LayoutAdmin name={dataCookies.cName} menu={dMenu}>
                {children}
            </LayoutAdmin>
        </>
    );
}