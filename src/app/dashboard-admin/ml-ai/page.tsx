import { funGetAllPaslon } from "@/modules/_global";
import { ViewAdminMLAI, funDownloadMlaiPaslonDate, funGetMlaiPaslonDate } from "@/modules/ml_ai";
import _ from "lodash";

export default async function Page({ searchParams }: { searchParams: { paslon: string, date: string } }) {
    const today = new Date();
    const dataMlai = {
        idPaslon: (_.isNaN(Number(searchParams.paslon)) ? 1 : Number(searchParams.paslon)),
        date: (_.isUndefined(searchParams.date) ? today : new Date(searchParams.date))
    }

    const dataPaslon = await funGetAllPaslon()
    const dataDB = await funGetMlaiPaslonDate({ paslon: dataMlai.idPaslon, date: dataMlai.date })
    const dataDownload = await funDownloadMlaiPaslonDate({ paslon: dataMlai.idPaslon, date: dataMlai.date })

    return (
        <>
            <ViewAdminMLAI paslon={dataPaslon} params={dataMlai} datatable={dataDB} datadownload={dataDownload} />
        </>
    );
}