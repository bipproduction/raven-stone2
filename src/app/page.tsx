import { ViewLogin } from "@/modules/auth";
import { cookies } from "next/headers";
import _ from "lodash"
import { redirect } from "next/navigation";

export default async function Home() {
  const c = cookies().get("_tknRV")
  if (c || !_.isUndefined(c)) return redirect('/dashboard/summary')

  return (
    <>
      <ViewLogin />
    </>
  )
}
