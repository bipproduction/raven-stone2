import ViewLayout from "@/modules/_global/front/view/view_layout";
import { cookies } from "next/headers";
import _ from "lodash"
import { redirect } from "next/navigation";
import { funCekAkses } from "@/modules/_global";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const c = cookies().get("_tknRV")
    if (!c || !c.value || _.isEmpty(c.value)) return redirect('/')

    const cekAkses = await funCekAkses()
    if(!cekAkses.dashboardUser && cekAkses.dashboardAdmin)  return redirect('/dashboard-admin/emotion-candidate')

    return (
        <>
            <ViewLayout>
                {children}
            </ViewLayout>
        </>
    );
}