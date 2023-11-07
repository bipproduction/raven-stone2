import { UserLogView, funGetAllUser } from "@/modules/user";

export default async function Page() {

    const dUser = await funGetAllUser()

    return (
        <><UserLogView user={dUser} /></>
    )
}