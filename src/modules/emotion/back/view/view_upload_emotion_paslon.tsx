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
import { isModalEmotionPaslon } from "../val/modal_emotion_paslon"
import ModalUploadEmotionPaslon from "../component/modal_upload_emotion_paslon"

export default function ViewUploadEmotionPaslon() {
    const [json, setJson] = useState<any[]>([])
    const [openModal, setOpenModal] = useAtom(isModalEmotionPaslon)


    async function onLoad(data: any) {
        if (data.length > 0) {
            if (
                ('id' in data[0]) &&
                ('idPaslon' in data[0]) &&
                ('idProvinsi' in data[0]) &&
                ('idKabkot' in data[0]) &&
                ('paslon' in data[0]) &&
                ('provinsi' in data[0]) &&
                ('kabkot' in data[0]) &&
                ('date' in data[0]) &&
                ('time' in data[0]) &&
                ('confidence' in data[0]) &&
                ('supportive' in data[0]) &&
                ('positive' in data[0]) &&
                ('undecided' in data[0]) &&
                ('unsupportive' in data[0]) &&
                ('uncomfortable' in data[0]) &&
                ('negative' in data[0]) &&
                ('dissaproval' in data[0])
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
                                                        <Table.Th>ID Paslon</Table.Th>
                                                        <Table.Th>ID Provinsi</Table.Th>
                                                        <Table.Th>ID Kabkot</Table.Th>
                                                        <Table.Th>Paslon</Table.Th>
                                                        <Table.Th>Provinsi</Table.Th>
                                                        <Table.Th>Kabupaten/Kota</Table.Th>
                                                        <Table.Th>Date</Table.Th>
                                                        <Table.Th>Time</Table.Th>
                                                        <Table.Th>Confidence</Table.Th>
                                                        <Table.Th>Supportive</Table.Th>
                                                        <Table.Th>Positive</Table.Th>
                                                        <Table.Th>Undecided</Table.Th>
                                                        <Table.Th>Unsupporitve</Table.Th>
                                                        <Table.Th>Uncomfortable</Table.Th>
                                                        <Table.Th>Negative</Table.Th>
                                                        <Table.Th>Dissapproval</Table.Th>
                                                    </Table.Tr>
                                                </Table.Thead>
                                                <Table.Tbody>
                                                    {json.map((home, i) =>
                                                        <Table.Tr key={i + 1}>
                                                            <Table.Td>{home.id}</Table.Td>
                                                            <Table.Td>{home.idPaslon}</Table.Td>
                                                            <Table.Td>{home.idProvinsi}</Table.Td>
                                                            <Table.Td>{home.idKabkot}</Table.Td>
                                                            <Table.Td>{home.paslon}</Table.Td>
                                                            <Table.Td>{home.provinsi}</Table.Td>
                                                            <Table.Td>{home.kabkot}</Table.Td>
                                                            <Table.Td>{home.date}</Table.Td>
                                                            <Table.Td>{home.time}</Table.Td>
                                                            <Table.Td>{home.confidence}</Table.Td>
                                                            <Table.Td>{home.supportive}</Table.Td>
                                                            <Table.Td>{home.positive}</Table.Td>
                                                            <Table.Td>{home.undecided}</Table.Td>
                                                            <Table.Td>{home.unsupportive}</Table.Td>
                                                            <Table.Td>{home.uncomfortable}</Table.Td>
                                                            <Table.Td>{home.negative}</Table.Td>
                                                            <Table.Td>{home.dissaproval}</Table.Td>
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
                <ModalUploadEmotionPaslon data={json} onSuccess={(val) => {
                    // setJson([])
                }} />
            </Modal>
        </>
    );
}