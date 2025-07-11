"use client"
import { Alert, Box, Button, Group, Text } from '@mantine/core';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import React from 'react';
import funUpdateJokowiEffect from '../fun/update_jokowi_effect';
import toast from 'react-simple-toasts';
import { isModalJokowi } from '../val/modal_jokowi';
import { funLogUser } from '@/modules/user';


/**
 * Fungsi untuk menampilkan Modal edit Jokowi Effect.
 * @param {dataJokowi} dataJokowi - menampilkan dataJokowi.
 * @param {textContent} textContent - menampilkan textContent.
 * @returns Untuk menampilkan Modal edit Jokowi Effect
 */
export default function ModalEditJokowiEffect({dataJokowi, textContent}: {dataJokowi: any, textContent: any}) {
  const [valOpenModal, setOpenModal] = useAtom(isModalJokowi)
  const router= useRouter()


  async function editJokowi() {
    const res = await funUpdateJokowiEffect({ data: dataJokowi, textContent: textContent });
    if (!res.success) return toast("Failed! " + res.message, { theme: "dark" });
    await funLogUser({act:"EDIT", desc:`User Edit Data Jokowi Effect (ID : ${dataJokowi.id})`})
    toast("Success", { theme: "dark" });
    setOpenModal(false);
  }

  return (
    <>
      <Box>
        <Alert color="gray" variant="outline">
          <Text fw={700} ta={"center"} mb={20} mt={20}>ARE YOU SURE TO EDIT THIS JOKOWI EFFECT?</Text>
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
              onClick={() => editJokowi()}
            >
              YES
            </Button>
          </Group>
        </Alert>
      </Box>
    </>
  );
}
