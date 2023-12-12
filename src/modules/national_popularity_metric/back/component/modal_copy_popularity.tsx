'use client'

import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai"
import toast from "react-simple-toasts"
import { isModalPopularity } from "../val/modal_popularity"
import funCopyPopularity from "../fun/copy_popularity"
import { useState } from "react"
import { funLogUser } from "@/modules/user"


/**
 * Fungsi untuk menampilkan modal copy popularity.
 * @param {from} from - menampilkan from.
 * @param {to} to - menampilkan to.
 * @param {onSuccess} onSuccess - menampilkan onSuccess.
 * @returns Untuk menampilkan modal copy popularity
 */
export default function ModalCopyPopularity({ from, to, onSuccess }: { from: any, to: any, onSuccess: (val: any) => void }) {
    const [openModal, setOpenModal] = useAtom(isModalPopularity)
    const [isLoading, setLoading] = useState(false)

    async function onUpload() {
        setLoading(true)
        await funCopyPopularity({ dateFrom: from, dateTo: to })
        await funLogUser({ act: "COPY DATA", desc: `User Copy Data, National Popularity Metric from: ${from} to: ${to} ` })
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
                        ANDA YAKIN INGIN MENGCOPY DATA NATIONAL POPULARITY?
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