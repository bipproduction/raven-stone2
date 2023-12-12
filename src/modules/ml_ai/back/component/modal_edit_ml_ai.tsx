import { Alert, Box, Button, Group, Text } from '@mantine/core';
import { useAtom } from 'jotai';
import React from 'react';
import { isModalMlai } from '../val/modal_mlai';
import { useRouter } from 'next/navigation';
import funUpdateMlAi from '../fun/update_ml_ai';
import toast from 'react-simple-toasts';
import { funLogUser } from '@/modules/user';


/**
 * Fungsi untuk menampilkan modal edit ml ai.
 * @param {dataMlAi} dataMlAi - menampilkan dataMlAi.
 * @param {textContent} textContent - menampilkan textContent.
 * @returns Untuk menampilkan modal edit ml ai
 */
export default function ModalEditMlAi({ dataMlAi, textContent }: { dataMlAi: any, textContent: any }) {
  const [valOpenModal, setOpenModal] = useAtom(isModalMlai)
  const router = useRouter()

  async function editMlAi() {
    const res = await funUpdateMlAi({ data: dataMlAi, textContent: textContent });
    if (!res.success) return toast("Failed! " + res.message, { theme: "dark" });
    await funLogUser({ act: "EDIT", desc: `User Edit Data ML-AI (ID : ${dataMlAi.id})` })
    toast("Success", { theme: "dark" });
    setOpenModal(false);
  }

  return (
    <>
      <Box>
        <Alert color="gray" variant="outline">
          <Text fw={700} ta={"center"} mb={20} mt={20}>ARE YOU SURE TO EDIT THIS ML AI?</Text>
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
              onClick={() => editMlAi()}
            >
              YES
            </Button>
          </Group>
        </Alert>
      </Box>
    </>
  );
}

