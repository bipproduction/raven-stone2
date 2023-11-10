'use client'

import { Box, Group, Pagination, ScrollArea, Table } from "@mantine/core"
import moment from "moment"
import { useState } from "react"

export default function TableLogUser({ user }: { user: any }) {
    const [listData, setListData] = useState<any[]>(user)
    return (
        <>
            <Box pt={30}>
                <ScrollArea>
                    <Table >
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Tanggal</Table.Th>
                                <Table.Th>Name</Table.Th>
                                <Table.Th>Jenis Aktivitas</Table.Th>
                                <Table.Th>Deskripsi</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {listData.map((e, i) => (
                                <Table.Tr key={i}>
                                    <Table.Td>{moment(e.createdAt).format("llll")}</Table.Td>
                                    <Table.Td>{e.name}</Table.Td>
                                    <Table.Td>{e.activity}</Table.Td>
                                    <Table.Td>{e.description}</Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
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