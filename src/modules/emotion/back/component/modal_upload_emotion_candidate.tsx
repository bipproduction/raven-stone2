'use client'

import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai"
import toast from "react-simple-toasts"
import { isModalEmotionCandidate } from "../val/modal_emotion"
import funUploadEmotionCandidate from "../fun/upload_emotion_candidate"
import { useState } from "react"
import { funLogUser } from "@/modules/user"


/**
 * Fungsi untuk menampilkan Modal upload emotion candidate.
 * @param {data} data - menampilkan data.
 * @param {onSuccess} onSuccess - menampilkan onSuccess.
 * @returns Untuk menampilkan Modal upload emotion candidate
 */
export default function ModalUploadEmotionCandidate({ data, onSuccess }: { data: any, onSuccess: (val: any) => void }) {
    const [openModal, setOpenModal] = useAtom(isModalEmotionCandidate)
    const [isLoading, setLoading] = useState(false)

    async function onUpload() {
        setLoading(true)
        const upd = await funUploadEmotionCandidate({ body: data })
        await funLogUser({ act: "UPLOAD", desc: `User Upload Emotion Candidate (Candidate ID: ${upd.candidate}, on ${upd.date} ${upd.time}` })
        setLoading(false)
        toast('Success', { theme: 'dark' })
        setOpenModal(false)
        onSuccess(true)
    }

    return (
        <>
            <Box>
                <Alert color="gray" variant="outline">
                    <Text fw={700} ta={"center"} mb={20} mt={20}>
                        ANDA YAKIN INGIN MENGUPDATE DATA EMOTION CANDIDATE?
                    </Text>
                    <Group justify="space-between" pt={10}>
                        <Button
                            radius={10}
                            color="gray.7"
                            w={150}
                            onClick={() => setOpenModal(false)}
                        >
                            NO
                        </Button>
                        <Button loading={isLoading} radius={10} color="gray.7" w={150} onClick={() => onUpload()}>
                            YES
                        </Button>
                    </Group>
                </Alert>
            </Box>
        </>
    )
}