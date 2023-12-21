"use client"
import { Alert, Box, Button, Group, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React from 'react';
import { isModalJokowi } from '../val/modal_jokowi';
import { useAtom } from 'jotai';
import funAddJokowiEffect from '../fun/add_jokowi_effect';
import toast from 'react-simple-toasts';
import { funLogUser } from '@/modules/user';

/**
 * Fungsi untuk menampilkan Modal add Jokowi Effect.
 * @param {dataJokowi} dataJokowi - menampilkan dataJokowi.
 * @param {textContent} textContent - menampilkan textContent.
 * @param {onSuccess} onSuccess - menampilkan onSuccess.
 * @returns Untuk menampilkan Modal add Jokowi Effect
 */

export default function ModalAddJokowiEffect({ dataJokowi, textContent, onSuccess }: { dataJokowi: any, textContent: any, onSuccess: (val: any) => void }) {
  const router = useRouter()
  const [valOpenModal, setOpenModal] = useAtom(isModalJokowi)

  async function addJokowi() {
    const res = await funAddJokowiEffect({ data: dataJokowi, textContent: textContent });
    if (!res.success) return toast("Failed! " + res.message, { theme: "dark" });
    await funLogUser({act:"ADD", desc:`User Add Data Jokowi Effect (ID : ${res.id})`})
    toast("Success", { theme: "dark" });
    setOpenModal(false);
    onSuccess(true)
  }

  return (
    <>
      <Box>
        <Alert color="gray" variant="outline">
          <Text fw={700} ta={"center"} mb={20} mt={20}>ARE YOU SURE TO ADD THIS JOKOWI EFFECT?</Text>
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
              onClick={() => addJokowi()}
            >
              YES
            </Button>
          </Group>
        </Alert>
      </Box>
    </>
  );
}

