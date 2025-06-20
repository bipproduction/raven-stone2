'use client'
import { Box, Button, Group, Paper, Select, SimpleGrid, Stack, Text } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TableDataPopularityNew from "../component/table_popularity_new";

/**
 * Fungsi untuk menampilkan view admin popularity.
 * @param {param} param - menampilkan param.
 * @param {datatable} datatable - menampilkan datatable.
 * @param {datadownload} datadownload - menampilkan datadownload.
 * @returns Untuk menampilkan view admin popularity
 */

export default function ViewAdminPopularityNew({ param, datatable }: { param: any, datatable: any }) {
    const router = useRouter()
    const [isDate, setDate] = useState<any>(param.date)

    useEffect(() => {
        setDate((param.date == null) ? new Date() : new Date(param.date))
    }, [param])



    function onProccess() {
        router.replace('/dashboard-admin/rate-popularity?&date=' + moment(isDate).format("YYYY-MM-DD"))
    }

    return (
        <>
            <Stack>
                <Text fw={"bold"}>RATE POPULARITY PASLON</Text>
            </Stack>
            <Box pt={30}>
                <SimpleGrid
                    cols={{ base: 1, sm: 2, lg: 2 }}
                    spacing={{ base: 10, sm: "xl" }}
                    verticalSpacing={{ base: "md", sm: "xl" }}
                >
                    <Box>
                        <Paper shadow="xs" p="xl">
                            <Stack>
                                <DateInput valueFormat="DD-MM-YYYY" required value={isDate}
                                    label={"Tanggal"} placeholder="Pilih Tanggal" onChange={(val) => { setDate(val) }} />
                                <Button bg={"gray"} onClick={() => onProccess()}>
                                    PROSES
                                </Button>
                            </Stack>
                        </Paper>
                    </Box>
                    <Group
                        justify="left"
                        style={{
                            backgroundColor: "white",
                            borderRadius: 10,
                        }}
                        px={50}
                    >
                        <Box
                            style={{
                                border: "1px dashed gray",
                                borderRadius: 10,
                                padding: 40,
                                cursor: "pointer",
                            }}
                            onClick={() => router.push("/dashboard-admin/rate-popularity/add")}
                        >
                            <Text ta={"center"} size="xl" inline>
                                ADD RATE
                            </Text>
                        </Box>
                    </Group>
                </SimpleGrid>
            </Box>
            {!_.isNull(datatable.title) && (
                <Box pt={20}>
                    <TableDataPopularityNew param={param} title={datatable.title} data={datatable.data} datajam={datatable.dataJam} />
                </Box>
            )}
        </>
    );
}