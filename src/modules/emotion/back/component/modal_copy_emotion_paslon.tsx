'use client'

import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai"
import toast from "react-simple-toasts"
import { isModalEmotionPaslon } from "../val/modal_emotion"
import funCopyEmotionPaslon from "../fun/copy_emotion_paslon"
import { useState } from "react"
import { funLogUser } from "@/modules/user"


/**
 * Fungsi untuk menampilkan Modal copy emotion paslon.
 * @param {from} from - menampilkan from.
 * @param {to} to - menampilkan to.
 * @param {paslon} paslon - menampilkan paslon.
 * @param {onSuccess} onSuccess - menampilkan onSuccess.
 * @returns Untuk menampilkan Modal copy emotion paslon
 */
export default function ModalCopyEmotionPaslon({ from, to, paslon, onSuccess }: { from: any, to: any, paslon: any, onSuccess: (val: any) => void }) {
    const [openModal, setOpenModal] = useAtom(isModalEmotionPaslon)
    const [isLoading, setLoading] = useState(false)

    async function onUpload() {
        setLoading(true)
        await funCopyEmotionPaslon({ paslon: paslon, dateFrom: from, dateTo: to })
        await funLogUser({ act: "COPY DATA", desc: `User Copy Emotion Candidate (Paslon ID : ${paslon}, From ${from} To ${to})` })
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