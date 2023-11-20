'use client'

import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai"
import toast from "react-simple-toasts"
import { isModalMlai } from "../val/modal_mlai"
import funDelMlaiById from "../fun/del_mlai_by_id"
import { funLogUser } from "@/modules/user"


export default function ModalDeleteMlai({ id, onSuccess }: { id: any, onSuccess: (val: any) => void }) {
    const [openModal, setOpenModal] = useAtom(isModalMlai)

    async function onDelete() {
        await funDelMlaiById({ idData: id })
        await funLogUser({ act: "DELETE", desc: `User Delete Data ML AI (ID : ${id})` })
        toast('Success', { theme: 'dark' })
        setOpenModal(false)
        onSuccess(true)
    }

    return (
        <>
            <Box>
                <Alert color="gray" variant="outline">
                    <Text fw={700} ta={"center"} mb={20} mt={20}>
                        ARE YOU SURE TO DELETE THIS ML-AI?
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