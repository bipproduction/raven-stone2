import { funGetAllPaslon, funGetOnePaslon } from "@/modules/_global";
import { ViewNationalPopularityMetric, funGetChartRateNew, funGetOnePopularityFront, funGetPopularityFront, funGetPopularityNew } from "@/modules/national_popularity_metric";
import moment from "moment";

export default async function Page() {
    const dPaslon = await funGetAllPaslon()
    const cPaslon = await funGetOnePaslon({ paslon: 1 })
    // const dNow = await funGetOnePopularityFront({ paslon: 1 })
    const dNow = await funGetPopularityNew({ paslon: 1 })
    // const dChart = await funGetPopularityFront({
    //     paslon: 1,
    //     startDate: moment(new Date()).subtract(7, "days").format("YYYY-MM-DD"),
    //     endDate: moment(new Date()).format("YYYY-MM-DD")
    // })
    const dChart = await funGetChartRateNew({
        paslon: 1,
        startDate: moment(new Date()).subtract(7, "days").format("YYYY-MM-DD"),
        endDate: moment(new Date()).format("YYYY-MM-DD")
    })

    return (
        <ViewNationalPopularityMetric cpaslon={cPaslon} paslon={dPaslon} dataNow={dNow} dbChart={dChart} />
    )
}