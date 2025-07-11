import { useAtom } from 'jotai';
import React from 'react';
import { isModalSwot } from '../val/modal_swot';
import { Alert, Box, Button, Group, Text } from '@mantine/core';
import toast from 'react-simple-toasts';
import funAddSwot from '../fun/add_swot';
import { funLogUser } from '@/modules/user';

/**
 * Fungsi untuk menampilkan Modal Add Swot.
 * @param {dataSwot} dataSwot - menampilkan dataSwot.
 * @param {textContent} textContent - menampilkan textContent.
 * @returns Untuk menampilkan Modal Add Swot
 */
export default function ModalAddSwot({ dataSwot, textContent, onSuccess }: { onSuccess: () => void, dataSwot: any, textContent: any }) {
    const [valOpenModal, setOpenModal] = useAtom(isModalSwot)

    async function addSwot() {
        const res = await funAddSwot({ data: dataSwot, textContent: textContent });
        if (!res.success) return toast("Failed! " + res.message, { theme: "dark" });
        await funLogUser({ act: "ADD", desc: `User Add Data Swot` })
        toast("Success", { theme: "dark" });
        setOpenModal(false);
        onSuccess()
    }

    return (
        <>
            <Box>
                <Alert color="gray" variant="outline">
                    <Text fw={700} ta={"center"} mb={20} mt={20}>ARE YOU SURE TO ADD THIS SWOT?</Text>
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
                            onClick={addSwot}
                        >
                            YES
                        </Button>
                    </Group>
                </Alert>
            </Box>
        </>
    );
}

