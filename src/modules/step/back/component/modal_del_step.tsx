'use client'

import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai"
import toast from "react-simple-toasts"
import { isModalStep } from "../val/modal_step"
import funDelStepById from "../fun/del_step"
import { funLogUser } from "@/modules/user"
import { funLogout } from "@/modules/auth"


/**
 * Fungsi untuk menampilkan Modal Delete Step.
 * @param {id} id - menampilkan id.
 * @param {onSuccess} onSuccess - menampilkan onSuccess.
 * @returns Untuk menampilkan Modal Delete Step
 */
export default function ModalDeleteStep({ id, onSuccess }: { id: any, onSuccess: (val: any) => void }) {
    const [openModal, setOpenModal] = useAtom(isModalStep)

    async function onDelete() {
        await funDelStepById({ idData: id })
        await funLogUser({act: "DELETE", desc: `User Delete Data Step (ID : ${id})`})
        toast('Success', { theme: 'dark' })
        setOpenModal(false)
        onSuccess(true)
    }

    return (
        <>
            <Box>
                <Alert color="gray" variant="outline">
                    <Text fw={700} ta={"center"} mb={20} mt={20}>
                        ANDA YAKIN INGIN MENGHAPUS DATA STEP?
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