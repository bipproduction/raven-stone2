'use client'

import { Button, Group, Stack, Text } from "@mantine/core"
import { DateInput } from "@mantine/dates"
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TableDataJokowi from "../component/table_data_jokowi";

export default function ViewAdminJokowi({ param, datatable }: { param: any, datatable: any }) {
    const router = useRouter()
    const today = new Date();

    const [isDate, setDate] = useState<any>((_.isNull(param.date)) ? today : new Date(param.date))

    function onProccess() {
        router.replace('/dashboard-admin/jokowi-effect?date=' + moment(isDate).format("YYYY-MM-DD"))
    }

    return (
        <>
            <Stack>
                <Text fw={"bold"}>JOKOWI EFFECT</Text>
            </Stack>
            <Group grow mt={30}>
                <DateInput valueFormat="DD-MM-YYYY" required value={isDate}
                    label={"Select Date"} placeholder="SELECT DATE" onChange={(val) => { setDate(val) }} />
                <Button mt={25} bg={"gray"} onClick={() => onProccess()}>
                    PROSES
                </Button>
            </Group>

            {!_.isNull(datatable.title) &&
                <TableDataJokowi title={datatable.title} data={datatable.data} searchParam={param} />
            }
        </>
    )
}