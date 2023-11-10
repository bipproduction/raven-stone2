import { UserLogView, funGetAllUser } from "@/modules/user";
import funGetLogUser from "@/modules/user/log/fun/get_log";
import moment from "moment";

export default async function Page() {

    const dUser = await funGetAllUser()
    // const data = funGetLogUser({ body: { 'dateFrom': moment(dateFrom).format('YYYY-MM-DD'), 'dateTo': moment(dateTo).format('YYYY-MM-DD'), 'user': isUser, 'page': 1 } })


    return (
        <><UserLogView user={dUser} 
        // logData={data}
         /></>
    )
}