import { ViewJokowiEffect, funGetEffectFront } from "@/modules/jokowi_effect";

export default async function Page(){
    const dEffect = await funGetEffectFront({isDate: new Date()})
    return(
        <ViewJokowiEffect effect={dEffect}/>
    )
}