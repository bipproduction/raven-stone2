'use client'

import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai"
import toast from "react-simple-toasts"
import { isModalEmotionPaslon } from "../val/modal_emotion"
import funCopyEmotionPaslon from "../fun/copy_emotion_paslon"
import { useState } from "react"
import { funLogUser } from "@/modules/user"

export default function ModalCopyEmotionPaslon({ from, to, onSuccess }: { from: any, to: any, onSuccess: (val: any) => void }) {
    const [openModal, setOpenModal] = useAtom(isModalEmotionPaslon)
    const [isLoading, setLoading] = useState(false)

    async function onUpload() {
        setLoading(true)
        await funCopyEmotionPaslon({ dateFrom: from, dateTo: to })
        await funLogUser({ act: "COPY DATA", desc: `User Copy Data, Emotion Paslon From: ${from} To: ${to} ` })
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
                        ANDA YAKIN INGIN MENGCOPY DATA EMOTION PASLON?
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