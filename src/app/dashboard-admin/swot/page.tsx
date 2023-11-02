import { funGetAllCandidate } from "@/modules/_global";
import { ViewAdminSwot, funDownloadSwotByCandidate, funGetSwotByCandidate } from "@/modules/swot";
import _ from "lodash";

export default async function Page({ searchParams }: { searchParams: { candidate: string } }) {
    const dataSwot = {
        idCandidate: (_.isNaN(Number(searchParams.candidate)) ? 1 : Number(searchParams.candidate)),
    }

    const dataKandidat = await funGetAllCandidate()
    const dataDB = await funGetSwotByCandidate({ candidate: dataSwot.idCandidate })
    const dataDownload = await funDownloadSwotByCandidate({ candidate: dataSwot.idCandidate })


    return (
        <>
            <ViewAdminSwot params={dataSwot} kandidat={dataKandidat} datatable={dataDB} datadownload={dataDownload} />
        </>
    );
}