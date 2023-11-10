'use client'

import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai"
import toast from "react-simple-toasts"
import { isModalEmotionPaslon } from "../val/modal_emotion"
import funUploadEmotionPaslon from "../fun/upload_emotion_paslon"
import { useState } from "react"
import { funLogUser } from "@/modules/user"

export default function ModalUploadEmotionPaslon({ data, onSuccess }: { data: any, onSuccess: (val: any) => void }) {
    const [openModal, setOpenModal] = useAtom(isModalEmotionPaslon)
    const [isLoading, setLoading] = useState(false)

    async function onUpload() {
        setLoading(true)
        await funUploadEmotionPaslon({ body: data })
        await funLogUser({ act: "UPLOAD", desc: `User UPLOAD, Emotion Paslon` })
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
                        ANDA YAKIN INGIN MENGUPDATE DATA EMOTION PASLON?
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