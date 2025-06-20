import { ViewSummary, funGetEmotionPaslonAreaFront } from "@/modules/emotion";
import { funGetAllAudienceFront } from "@/modules/audience";
import { funGetEmotionCandidateChartFront, funGetEmotionJokowiEffectAreaFront, funGetEmotionPersenJokowiFront } from "@/modules/emotion";
import { funGetEffectFront } from "@/modules/jokowi_effect";
import moment from "moment";
import { funGetAllPaslonFront } from "@/modules/_global";

export default async function Page() {
    const dPaslon = await funGetAllPaslonFront()
    const dEmotionPaslonTable = await funGetEmotionPaslonAreaFront()
    const dEffect = await funGetEffectFront({ isDate: new Date() })
    const dEmotion = await funGetEmotionJokowiEffectAreaFront()
    const dLocked = await funGetAllAudienceFront()
    const dEmotionPersen = await funGetEmotionPersenJokowiFront()
    const dEmotionChart = await funGetEmotionCandidateChartFront({
        candidate: 7,
        startDate: moment(new Date()).subtract(7, "days").format("YYYY-MM-DD"),
        endDate: moment(new Date()).format("YYYY-MM-DD")
    })

    return (
        <>
            <ViewSummary summaryTable={dEmotionPaslonTable} paslon={dPaslon} effect={dEffect} emotion={dEmotion} locked={dLocked} persen={dEmotionPersen} emotionChart={dEmotionChart} />
        </>
    )
}