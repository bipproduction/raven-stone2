'use client'

import { Box, Group, Pagination, ScrollArea, Table } from "@mantine/core"

export default function TableLogUser() {
    return (
        <>
            <Box pt={30}>
                <ScrollArea>
                    <Table withTableBorder withColumnBorders verticalSpacing="lg">
                        <thead>
                            <tr>
                                <th>Tanggal</th>
                                <th>Name</th>
                                <th>Jenis Aktivitas</th>
                                <th>Deskripsi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {listDataNew.map((e, i) => (
                                            <tr key={i}>
                                                <td>{moment(e.createdAt).format("llll")}</td>
                                                <td>{e.name}</td>
                                                <td>{e.activity}</td>
                                                <td>{e.description}</td>
                                            </tr>
                                        ))} */}
                        </tbody>
                    </Table>
                </ScrollArea>
            </Box>
            <Group justify="right" mt={20}>
                <Pagination
                    value={1}
                    // onChange={(val) => onLog()}
                    total={10}
                />
            </Group>
        </>
    )
}