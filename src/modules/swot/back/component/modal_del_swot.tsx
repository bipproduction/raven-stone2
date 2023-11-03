'use client'

import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai"
import toast from "react-simple-toasts"
import { isModalSwot } from "../val/modal_swot"
import funDelSwotById from "../fun/del_swot_by_id"


export default function ModalDeleteSwot({ id, onSuccess }: { id: any, onSuccess: (val: any) => void }) {
    const [openModal, setOpenModal] = useAtom(isModalSwot)

    async function onDelete() {
        await funDelSwotById({ idData: id })
        toast('Success', { theme: 'dark' })
        setOpenModal(false)
        onSuccess(true)
    }

    return (
        <>
            <Box>
                <Alert color="gray" variant="outline">
                    <Text fw={700} ta={"center"} mb={20} mt={20}>
                        ANDA YAKIN INGIN MENGHAPUS DATA SWOT?
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
                        <Button radius={10} color="gray.7" w={150} onClick={() => onDelete()}>
                            YES
                        </Button>
                    </Group>
                </Alert>
            </Box>
        </>
    )
}