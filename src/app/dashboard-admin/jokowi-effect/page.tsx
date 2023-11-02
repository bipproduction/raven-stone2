import { ViewAdminJokowi, funDownloadEffectByDate, funGetEffectByDate } from "@/modules/jokowi_effect";
import _ from "lodash";

export default async function Page({ searchParams }: { searchParams: { date: any } }) {
    const today = new Date();
    const findData = {
        date: (_.isUndefined(searchParams.date) ? today : new Date(searchParams.date))
    }

    const dataDB = await funGetEffectByDate({ date: findData.date })
    const dataDownload = await funDownloadEffectByDate({ date: findData.date })

    return (
        <>
            <ViewAdminJokowi datatable={dataDB} param={findData} datadownload={dataDownload} />
        </>
    )
}