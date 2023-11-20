'use client'

import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai"
import toast from "react-simple-toasts"
import { isModalJokowi } from "../val/modal_jokowi"
import funDelEffectById from "../fun/del_effect_by_id"
import { funLogUser } from "@/modules/user"


export default function ModalDeleteJokowi({ id, onSuccess }: { id: any, onSuccess: (val: any) => void }) {
    const [openModal, setOpenModal] = useAtom(isModalJokowi)

    async function onDelete() {
        await funDelEffectById({ idData: id })
        await funLogUser({ act: "DELETE", desc: `User Delete Data Jokowi Effect (ID : ${id})` })
        toast('Success', { theme: 'dark' })
        setOpenModal(false)
        onSuccess(true)
    }

    return (
        <>
            <Box>
                <Alert color="gray" variant="outline">
                    <Text fw={700} ta={"center"} mb={20} mt={20}>
                        ARE YOU SURE TO DELETE THIS JOKOWI EFFECT?
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