import { ViewLogin } from "@/modules/auth";
import { cookies } from "next/headers";
import _ from "lodash"
import { redirect } from "next/navigation";
import { unsealData } from "iron-session";
import { pwd_key_config } from "@/modules/_global/bin/val_global";

export default async function Home() {

  const c = cookies().get("_tknRV")

  if (c || !_.isUndefined(c)) {
    const dataCookies = await unsealData(c!.value, { password: pwd_key_config as string })
    if (!_.isEmpty(dataCookies)) return redirect('/dashboard/summary')
  }

  return (
    <>
      <ViewLogin />
    </>
  )
}
