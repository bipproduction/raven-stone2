import { funGetAllProvince } from "@/modules/_global";
import { ViewAdminAudience, funDownloadAudienceByArea, funGetAudienceByArea } from "@/modules/audience";
import _ from "lodash"

export default async function Page({ searchParams }: { searchParams: { prov: any } }) {
    const findData = {
        idProvinsi: (_.isNaN(Number(searchParams.prov)) ? 0 : Number(searchParams.prov)),
    }

    const prov = await funGetAllProvince()
    const data = await funGetAudienceByArea({ find: findData })
    const dataDownload = await funDownloadAudienceByArea({ find: findData })


    return <ViewAdminAudience param={findData} provinsi={prov} datatable={data} datadownload={dataDownload} />;
}