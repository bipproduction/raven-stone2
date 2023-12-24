import { Alert, Box, Button, Group, Text } from '@mantine/core';
import { useAtom } from 'jotai';
import React from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-simple-toasts';
import { isModalRhi } from '../val/modal_rhi';
import funEditRhi from '../fun/edit_rhi';


export default function ModalEditRhi({ dataId, content }: { dataId: any, content: any }) {
    const [valOpenModal, setOpenModal] = useAtom(isModalRhi)
    const router = useRouter()

    async function editRhi() {
        const res = await funEditRhi({ id: dataId, text: content });
        if (!res.success) return toast("Failed! " + res.message, { theme: "dark" });
        // await funLogUser({ act: "EDIT", desc: `User Edit Data ML-AI (ID : ${dataRhi.id})` })
        toast("Success", { theme: "dark" });
        setOpenModal(false);
        router.back()
    }

    return (
        <>
            <Box>
                <Alert color="gray" variant="outline">
                    <Text fw={700} ta={"center"} mb={20} mt={20}>ANDA YAKIN INGIN MENGUPDATE DATA REGION HOT ISSUES?</Text>
                    <Group justify="space-between" pt={10}>
                        <Button
                            radius={10}
                            color="gray.7"
                            w={150}
                            onClick={() => setOpenModal(false)}
                        >
                            NO
                        </Button>
                        <Button
                            radius={10}
                            color="gray.7"
                            w={150}
                            onClick={() => editRhi()}
                        >
                            YES
                        </Button>
                    </Group>
                </Alert>
            </Box>
        </>
    );
}

