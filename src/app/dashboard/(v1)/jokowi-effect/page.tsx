import { funGetAllAudienceFront } from "@/modules/audience";
import { funGetEmotionJokowiEffectAreaFront } from "@/modules/emotion";
import { ViewJokowiEffect, funGetEffectFront } from "@/modules/jokowi_effect";

export default async function Page() {
    const dEffect = await funGetEffectFront({ isDate: new Date() })
    const dEmotion = await funGetEmotionJokowiEffectAreaFront()
    const dLocked = await funGetAllAudienceFront()

    return (
        <ViewJokowiEffect effect={dEffect} emotion={dEmotion} locked={dLocked} />
    )
}