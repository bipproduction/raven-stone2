'use client'
import { Alert, Box, Button, Group, Text } from '@mantine/core';
import React from 'react';
import toast from 'react-simple-toasts';
import { useAtom } from 'jotai';
import { funLogUser } from '@/modules/user';
import { isModalStep } from '../val/modal_step';
import funAddStep from '../fun/add_step';

/**
 * Fungsi untuk menampilkan Modal Add tep.
 * @param {dataStep} dataStep - menampilkan dataStep.
 * @param {textContent} textContent - menampilkan textContent.
 * @returns Untuk menampilkan Modal Add tep
 */

export default function ModalAddStep({ dataStep, textContent, onSuccess }: { dataStep: any, textContent: any, onSuccess: (val: any) => void }) {
    const [valOpenModal, setOpenModal] = useAtom(isModalStep)

    async function addStep() {
        const res = await funAddStep({ data: dataStep, textContent: textContent });
        if (!res.success) return toast("Failed! " + res.message, { theme: "dark" });
        await funLogUser({ act: "ADD", desc: `User Add Data Step )` })
        toast("Success", { theme: "dark" });
        onSuccess(true);
        setOpenModal(false);
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
