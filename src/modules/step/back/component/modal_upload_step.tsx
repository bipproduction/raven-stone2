'use client'

import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai"
import toast from "react-simple-toasts"
import { isModalStep } from "../val/modal_step"
import funUploadStep from "../fun/upload_step"
import { funLogUser } from "@/modules/user"


/**
 * Fungsi untuk menampilkan Modal Upload Step.
 * @param {data} data - menampilkan data.
 * @param {onSuccess} onSuccess - menampilkan onSuccess.
 * @returns Untuk menampilkan Modal Upload Step
 */
export default function ModalUploadStep({ data, onSuccess }: { data: any, onSuccess: (val: any) => void }) {
    const [openModal, setOpenModal] = useAtom(isModalStep)

    async function onUpload() {
        await funUploadStep({ body: data })
        await funLogUser({ act: "UPLOAD", desc: `User Upload Data Step` })
        toast('Success', { theme: 'dark' })
        setOpenModal(false)
        onSuccess(true)
    }

    return (
        <>
            <Box>
                <Alert color="gray" variant="outline">
                    <Text fw={700} ta={"center"} mb={20} mt={20}>
                        ANDA YAKIN INGIN MENGUPDATE DATA STEP?
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