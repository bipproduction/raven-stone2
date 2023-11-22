'use client'

import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai"
import { isModalAudience } from "../val/modal_audience"
import funUploadAudience from "../fun/upload_audience"
import toast from "react-simple-toasts"
import { funLogUser } from "@/modules/user"
import { useState } from "react"

export default function ModalUploadAudience({ data, onSuccess }: { data: any, onSuccess: (val: any) => void }) {
    const [openModal, setOpenModal] = useAtom(isModalAudience)
    const [isLoading, setLoading] = useState(false)

    async function onUpload() {
        setLoading(true)
        await funUploadAudience({ body: data })
        await funLogUser({ act: "UPLOAD", desc: `User Uploads Data Audience` })
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
                        ANDA YAKIN INGIN MENGUPDATE DATA AUDIENCE?
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