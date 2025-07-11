'use client'

import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai"
import toast from "react-simple-toasts"
import { isModalJokowi } from "../val/modal_jokowi"
import funUploadEffect from "../fun/upload_effect"
import { funLogUser } from "@/modules/user"


/**
 * Fungsi untuk menampilkan Modal upload Jokowi Effect.
 * @param {data} data - menampilkan data.
 * @param {onSuccess} onSuccess - menampilkan onSuccess.
 * @returns Untuk menampilkan Modal upload Jokowi Effect
 */
export default function ModalUploadJokowi({ data, onSuccess }: { data: any, onSuccess: (val: any) => void }) {
    const [openModal, setOpenModal] = useAtom(isModalJokowi)

    async function onUpload() {
        await funUploadEffect({ body: data })
        await funLogUser({ act: "UPLOAD", desc: `User Upload Data Jokowi Effect` })
        toast('Success', { theme: 'dark' })
        setOpenModal(false)
        onSuccess(true)
    }

    return (
        <>
            <Box>
                <Alert color="gray" variant="outline">
                    <Text fw={700} ta={"center"} mb={20} mt={20}>
                        ANDA YAKIN INGIN MENGUPDATE DATA JOKOWI EFFECT?
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
                        <Button radius={10} color="gray.7" w={150} onClick={() => onUpload()}>
                            YES
                        </Button>
                    </Group>
                </Alert>
            </Box>
        </>
    )
}