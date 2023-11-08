import ViewLayout from "@/modules/_global/front/view/view_layout";
import { cookies } from "next/headers";
import _ from "lodash"
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
    // const c = cookies().get("_tkn")
    // if (!c || !c.value || _.isEmpty(c.value)) return redirect('/')
    return (
        <>
            <ViewLayout>
                {children}
            </ViewLayout>
        </>
    );
}