'use client'

import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai"
import toast from "react-simple-toasts"
import { isModalPopularity } from "../val/modal_popularity"
import funUploadPopularity from "../fun/upload_popularity"
import { useState } from "react"
import { funLogUser } from "@/modules/user"

export default function ModalUploadPopularity({ data, onSuccess }: { data: any, onSuccess: (val: any) => void }) {
    const [openModal, setOpenModal] = useAtom(isModalPopularity)
    const [isLoading, setLoading] = useState(false)

    async function onUpload() {
        setLoading(true)
        await funUploadPopularity({ body: data })
        await funLogUser({ act: "UPLOAD", desc: `User Uploads, National Popularity Metric` })
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
                        ANDA YAKIN INGIN MENGUPDATE DATA NATIONAL POPULARITY?
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