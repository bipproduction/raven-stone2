'use client'

import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai"
import toast from "react-simple-toasts"
import { isModalEmotionPaslon } from "../val/modal_emotion"
import funCopyEmotionCandidate from "../fun/copy_emotion_candidate"
import { useState } from "react"
import { funLogUser } from "@/modules/user"

export default function ModalCopyEmotionCandidate({ from, to, candidate, onSuccess }: { from: any, to: any, candidate: any, onSuccess: (val: any) => void }) {
    const [openModal, setOpenModal] = useAtom(isModalEmotionPaslon)
    const [isLoading, setLoading] = useState(false)

    async function onUpload() {
        setLoading(true)
        await funCopyEmotionCandidate({ dateFrom: from, dateTo: to, candidate: candidate })
        await funLogUser({ act: "COPY DATA", desc: `User Copy Emotion Candidate (Candidate ID : ${candidate}, From ${from} To ${to})` })
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
                        ANDA YAKIN INGIN MENGCOPY DATA EMOTION CANDIDATE?
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