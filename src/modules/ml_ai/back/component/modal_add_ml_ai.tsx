import { Alert, Box, Button, Group, Text } from '@mantine/core';
import React from 'react';
import funAddMlAi from '../fun/add_ml_ai';
import toast from 'react-simple-toasts';
import { useAtom } from 'jotai';
import { isModalMlai } from '../val/modal_mlai';
import { funLogUser } from '@/modules/user';


/**
 * Fungsi untuk menampilkan modal add ml ai.
 * @param {dataMlAi} dataMlAi - menampilkan dataMlAi.
 * @param {textContent} textContent - menampilkan textContent.
 * @returns Untuk menampilkan modal add ml ai
 */
export default function ModalAddMlAi({ dataMlAi, textContent }: { dataMlAi: any, textContent: any }) {
  const [valOpenModal, setOpenModal] = useAtom(isModalMlai)

  async function addMlAi() {
    const res = await funAddMlAi({ data: dataMlAi, textContent: textContent });
    if (!res.success) return toast("Failed! " + res.message, { theme: "dark" });
    await funLogUser({ act: "ADD", desc: `User Add Data ML-AI (ID : ${res.id})` })
    toast("Success", { theme: "dark" });
    setOpenModal(false);
  }
  return (
    <>
      <Box>
        <Alert color="gray" variant="outline">
          <Text fw={700} ta={"center"} mb={20} mt={20}>ARE YOU SURE TO ADD THIS ML-AI?</Text>
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
              onClick={() => addMlAi()}
            >
              YES
            </Button>
          </Group>
        </Alert>
      </Box>
    </>
  );
}
