'use client'

import { ButtonBack } from "@/modules/_global"
import { Box, Button, Group, Modal, ScrollArea, Stack, Table, Text, rem } from "@mantine/core"
import { Dropzone } from "@mantine/dropzone"
import { useState } from "react"
import { AiOutlineUpload } from "react-icons/ai"
import { MdCancelPresentation } from "react-icons/md"
import { GrDocumentCsv } from 'react-icons/gr';
import toast from "react-simple-toasts"
import papa from 'papaparse'
import { useAtom } from "jotai"
import { isModalJokowi } from "../val/modal_jokowi"
import ModalUploadJokowi from "../component/modal_upload_jokowi"


export default function ViewUploadJokowi() {
    const [json, setJson] = useState<any[]>([])
    const [openModal, setOpenModal] = useAtom(isModalJokowi)


    async function onLoad(data: any) {
        if (data.length > 0) {
            if (
                ('id' in data[0]) &&
                ('dateContent' in data[0]) &&
                ('timeContent' in data[0]) &&
                ('content' in data[0])
            ) {
                setJson(data as any)
            } else {
                setJson([])
                toast('Format CSV salah', { theme: 'dark' })
            }
        } else {
            setJson([])
            toast('Data Kosong', { theme: 'dark' })
        }
    }


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
                            onLoad(data)
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
                    {
                        (json.length > 0) && (
                            <>
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
                                                        <Table.Th>ID</Table.Th>
                                                        <Table.Th>Tanggal</Table.Th>
                                                        <Table.Th>Jam</Table.Th>
                                                        <Table.Th>Content</Table.Th>
                                                    </Table.Tr>
                                                </Table.Thead>
                                                <Table.Tbody>
                                                    {json.map(home =>
                                                        <Table.Tr key={home.id}>
                                                            <Table.Td>{home.id}</Table.Td>
                                                            <Table.Td>{home.dateContent}</Table.Td>
                                                            <Table.Td>{home.timeContent}</Table.Td>
                                                            <Table.Td>{home.content}</Table.Td>
                                                        </Table.Tr>
                                                    )}
                                                </Table.Tbody>
                                            </Table>
                                        </ScrollArea>

                                    </Box>
                                </Box>
                                <Group >
                                    <Button mt={20} fullWidth bg={"dark"} onClick={() => {
                                        setOpenModal(true)
                                    }}>UPLOAD</Button>
                                </Group>
                            </>
                        )
                    }
                </Box>
            </Stack>

            <Modal
                opened={openModal}
                onClose={() => setOpenModal(false)}
                centered
                withCloseButton={false}
                closeOnClickOutside={false}
            >
                <ModalUploadJokowi data={json} onSuccess={(val) => {
                    setJson([])
                }} />
            </Modal>
        </>
    );
}