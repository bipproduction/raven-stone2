import { funGetAllCandidate } from "@/modules/_global";
import { ViewAdminStep, funDownloadStepCandidate, funGetStepByCandidate } from "@/modules/step";
import _ from "lodash";

export default async function Page({ searchParams }: { searchParams: { candidate: string } }) {
    const datastep = {
        idCandidate: (_.isNaN(Number(searchParams.candidate)) ? 1 : Number(searchParams.candidate)),
    }

    const dataKandidat = await funGetAllCandidate()
    const dataDB = await funGetStepByCandidate({ candidate: datastep.idCandidate })
    const dataDownload = await funDownloadStepCandidate({ candidate: datastep.idCandidate })

    return (
        <>
            <ViewAdminStep params={datastep} kandidat={dataKandidat} datatable={dataDB} datadownload={dataDownload} />
        </>
    );
}