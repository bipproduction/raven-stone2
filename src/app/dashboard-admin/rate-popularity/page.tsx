import { ViewAdminPopularityNew, funDownloadPopularityByDate, funGetPopularityByDate } from "@/modules/national_popularity_metric";
import funGetAllRatePopularityNew from "@/modules/national_popularity_metric/back/fun/get_rate_popularity_new";
import _ from "lodash";

export default async function Page({ searchParams }: { searchParams: { candidate: any, date: any, prov: any } }) {
    const today = new Date();
    const findData = {
        date: (_.isUndefined(searchParams.date) ? today : new Date(searchParams.date)),
    }
    const dataDB = await funGetAllRatePopularityNew({ find: findData })

    return (
        <>
            <ViewAdminPopularityNew datatable={dataDB} param={findData} />
        </>
    )
}