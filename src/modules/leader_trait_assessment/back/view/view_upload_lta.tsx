'use client'

import { ButtonBack } from "@/modules/_global"
import { Box, Button, Group, ScrollArea, Stack, Table, Text, rem } from "@mantine/core"
import { Dropzone } from "@mantine/dropzone"
import { useState } from "react"
import { AiOutlineUpload } from "react-icons/ai"
import { MdCancelPresentation } from "react-icons/md"
import { GrDocumentCsv } from 'react-icons/gr';
import toast from "react-simple-toasts"
import papa from 'papaparse'

export default function ViewUploadLTA() {
    const [json, setJson] = useState<any[]>([])


    async function onpload(data: any) {
        //   const res = await funUploadLeader(data)
        //   if (res.success) return toast(res.message)
    }
    const [dataUpload, setDataUplaod] = useState()

    const getHeadings = () => {
        return json
    };

    return (
        <>
            <Stack>
                <ButtonBack />
            </Stack>
            <Stack p={"md"}>
                <Box
                    style={{
                        backgroundColor: "gray",
                        padding: 20,
                        borderRadius: 10
                    }}
                >
                    <Text fw={"bold"} c={"white"} mb={20}>UPLOAD DATA CSV</Text>
                    <Dropzone
                        style={{
                            border: "1px dashed",
                            color: "white",
                            borderRadius: 10,
                            cursor: "pointer"
                        }}
                        onDrop={async (files: any) => {
                            const csv_file = Buffer.from(await files[0].arrayBuffer()).toString()
                            const { data } = papa.parse(csv_file, { header: true, })
                            setJson(data as any)
                        }}
                        onReject={(files: any) => {
                            toast("success")

                        }}
                        maxSize={3 * 1024 ** 2}
                        accept={['text/csv']}
                    >
                        <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                            <Dropzone.Accept>
                                <AiOutlineUpload
                                    style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                                    stroke={1.5}
                                />
                            </Dropzone.Accept>
                            <Dropzone.Reject>
                                <MdCancelPresentation
                                    style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                                    stroke={1.5}
                                />
                            </Dropzone.Reject>
                            <Dropzone.Idle>
                                <GrDocumentCsv
                                    style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                                    stroke={1.5}
                                />
                            </Dropzone.Idle>

                            <div>
                                <Text size="xl" inline>
                                    Drag images here or click to select files
                                </Text>
                                <Text size="sm" inline mt={7} >
                                    Attach as many files as you like, each file should not exceed 5mb
                                </Text>
                            </div>
                        </Group>
                    </Dropzone>
                    <Box style={{
                        borderRadius: 10,
                        paddingTop: 20
                    }}>

                        <Box
                            style={{
                                backgroundColor: "white",
                                padding: 10,
                                borderRadius: 10,
                            }}
                        >
                            <ScrollArea>
                                <Table
                                    withTableBorder
                                    withRowBorders={false}
                                    horizontalSpacing="xl"
                                >
                                    <Table.Thead>
                                        <Table.Tr
                                            style={{
                                                borderBottom: "1px solid #CED4D9",
                                            }}
                                        >
                                            <Table.Th>No</Table.Th>
                                            <Table.Th>Nama</Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody>
                                        {json.map(home =>
                                            <Table.Tr key={home.id}>
                                                <Table.Td>{home.id}</Table.Td>
                                                <Table.Td>{home.name}</Table.Td>
                                            </Table.Tr>
                                        )}
                                    </Table.Tbody>
                                </Table>
                            </ScrollArea>
                        </Box>
                    </Box>
                    <Group >
                        <Button mt={20} fullWidth bg={"dark"}>UPLOAD</Button>
                    </Group>
                </Box>
            </Stack>
        </>
    );
}