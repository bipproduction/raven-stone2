import { LayoutAdmin } from "@/modules/_global";
import { cookies } from "next/headers";
import _ from "lodash"
import { unsealData } from "iron-session";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
    // const c = cookies().get("_tkn")
    // if (!c || !c.value || _.isEmpty(c.value)) return redirect('/')
    
    
    // console.log(c);
    // if (!c || !c.value || _.isEmpty(c.value)) return redirect('/')
    // const dataCookies = await unsealData(c.value, { password: process.env.PWD as string })
    // console.log(dataCookies)

    return (
        <>
            <LayoutAdmin>
                {children}
            </LayoutAdmin>
        </>
    );
}