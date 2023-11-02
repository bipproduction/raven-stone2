import { funGetAllCandidate, funGetAllProvince } from "@/modules/_global";
import { ViewAdminEmotionCandidate, funDownloadEmotionCandidateByDate, funGetEmotionCandidateDateArea } from "@/modules/emotion";
import _ from "lodash";

export default async function Page({ searchParams }: { searchParams: { candidate: any, date: any, prov: any } }) {
    const today = new Date();
    const findData = {
        idCandidate: (_.isNaN(Number(searchParams.candidate)) ? 1 : Number(searchParams.candidate)),
        date: (_.isUndefined(searchParams.date) ? today : new Date(searchParams.date)),
        idProvinsi: (_.isNaN(Number(searchParams.prov)) ? 0 : Number(searchParams.prov)),
    }

    const dataCan = await funGetAllCandidate()
    const dataProv = await funGetAllProvince()
    const dataDB = await funGetEmotionCandidateDateArea({ find: findData })
    const dataDownload = await funDownloadEmotionCandidateByDate({ find: findData })


    return (
        <>
            <ViewAdminEmotionCandidate datadownload={dataDownload} candidate={dataCan} datatable={dataDB} param={findData} provinsi={dataProv} />
        </>
    )
}