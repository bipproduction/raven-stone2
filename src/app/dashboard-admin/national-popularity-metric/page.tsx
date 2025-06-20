import { ViewAdminPopularity, funDownloadPopularityByDate, funGetPopularityByDate } from "@/modules/national_popularity_metric";
import _ from "lodash"

export default async function Page({ searchParams }: { searchParams: { candidate: any, date: any, prov: any } }) {
    const today = new Date();
    const findData = {
        date: (_.isUndefined(searchParams.date) ? today : new Date(searchParams.date)),
    }

    const dataDB = await funGetPopularityByDate({ find: findData })
    const dataDownload = await funDownloadPopularityByDate({ find: findData })

    return (
        <>
            <ViewAdminPopularity datadownload={dataDownload} datatable={dataDB} param={findData} />
        </>
    )
}