import { cookies } from "next/headers"
import _ from "lodash"
import { redirect } from "next/navigation"

export default function Page(){
    // const c = cookies().get("_tkn")
    // if (!c || !c.value || _.isEmpty(c.value)) return redirect('/')
    
    return(
        <>
            halaman real time
        </>
    )
}