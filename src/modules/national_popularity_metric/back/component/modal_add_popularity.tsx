'use client'
import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai"
import toast from "react-simple-toasts"
import { isModalPopularity } from "../val/modal_popularity"
import { useState } from "react"
import { funLogUser } from "@/modules/user"
import funAddRatePopularity from "../fun/add_rate_popularity"

/**
 * Fungsi untuk menampilkan modal upload popularity.
 * @param {data} data - menampilkan data.
 * @param {onSuccess} onSuccess - menampilkan onSuccess.
 * @returns Untuk menampilkan modal upload popularity
 */

export default function ModalAddPopularity({ dataTime, dataRate, onSuccess }: { dataTime: any, dataRate: any, onSuccess: (val: any) => void }) {
    const [openModal, setOpenModal] = useAtom(isModalPopularity)
    const [isLoading, setLoading] = useState(false)

    async function onSubmit() {
        setLoading(true)
        const ins = await funAddRatePopularity({ dataRate: dataRate, dataTime: dataTime })
        if (!ins) {
            setLoading(false)
            return toast('Failed!, Sudah terdapat data pada tanggal dan jam tersebut', { theme: 'dark' })
        }
        await funLogUser({ act: "ADD", desc: `User Add, Rate Popularity` })
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
                        ANDA YAKIN INGIN MENAMBAH DATA RATE POPULARITY?
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
                        <Button loading={isLoading} radius={10} color="gray.7" w={150} onClick={() => onSubmit()}>
                            YES
                        </Button>
                    </Group>
                </Alert>
            </Box>
        </>
    )
}