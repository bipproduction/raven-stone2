import { Alert, Box, Button, Group, Text } from '@mantine/core';
import React from 'react';
import toast from 'react-simple-toasts';
import { useAtom } from 'jotai';
import { funLogUser } from '@/modules/user';
import { isModalStep } from '../val/modal_step';

export default function ModalAddStep({ dataStep, textContent }: { dataStep: any, textContent: any }) {
    const [valOpenModal, setOpenModal] = useAtom(isModalStep)

    async function addStep() {
        // const res = await funAddMlAi({ data: dataMlAi, textContent: textContent });
        // if (!res.success) return toast("Failed! " + res.message, { theme: "dark" });
        // await funLogUser({ act: "ADD", desc: `User Add Data ML-AI (ID : ${res.id})` })
        // toast("Success", { theme: "dark" });
        // setOpenModal(false);
    }
    return (
        <>
            <Box>
                <Alert color="gray" variant="outline">
                    <Text fw={700} ta={"center"} mb={20} mt={20}>ARE YOU SURE TO ADD THIS STEP?</Text>
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
                            onClick={() => addStep()}
                        >
                            YES
                        </Button>
                    </Group>
                </Alert>
            </Box>
        </>
    );
}