import { funGetAllProvince } from "@/modules/_global";
import { ViewAdminRHI, funDownloadRhiByArea, funGetRhiByArea } from "@/modules/region_hot_issue";
import _ from "lodash"

export default async function Page({ searchParams }: { searchParams: { prov: any } }) {
    const findData = {
        idProvinsi: (_.isNaN(Number(searchParams.prov)) ? 0 : Number(searchParams.prov)),
    }

    const prov = await funGetAllProvince()
    const dataDB = await funGetRhiByArea({ find: findData })
    const dataDownload = await funDownloadRhiByArea({ find: findData })

    return <ViewAdminRHI param={findData} provinsi={prov} datatable={dataDB} datadownload={dataDownload} />;
}