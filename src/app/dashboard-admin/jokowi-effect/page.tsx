import { ViewAdminJokowi } from "@/modules/jokowi_effect";
import _ from "lodash";

export default function Page({ searchParams }: { searchParams: { date: any } }) {
    const findData = {
        date: (_.isUndefined(searchParams.date) ? null : searchParams.date)
    }

    return (
        <>
            <ViewAdminJokowi datatable={{ title: null, data: [], th: [] }} param={findData} />
        </>
    )
}