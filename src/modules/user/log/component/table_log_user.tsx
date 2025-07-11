'use client'

import { Box, Group, Pagination, ScrollArea, Table } from "@mantine/core"
import moment from "moment"
import { useState } from "react"


/**
 * Fungsi untuk menampilkan table log user.
 * @param {user} user - menampilkan user.
 * @param {npage} npage - menampilkan npage.
 * @returns  Hasil menampilkan tabel log user.
 */
export default function TableLogUser({ user, npage }: { user: any, npage: any }) {
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
                    onChange={(val) => console.log(val)}
                    total={npage}
                />
            </Group>
        </>
    )
}