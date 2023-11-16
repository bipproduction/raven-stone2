"use client"
import { Alert, Box, Button, Group, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React from 'react';
import { isModalJokowi } from '../val/modal_jokowi';
import { useAtom } from 'jotai';
import funAddJokowiEffect from '../fun/add_jokowi_eefect';
import toast from 'react-simple-toasts';

export default function ModalAddJokowiEffect({dataJokowi, textContent}: {dataJokowi: any, textContent: any}) {
  const router = useRouter()
  const [valOpenModal, setOpenModal] = useAtom(isModalJokowi)

  async function addJokowi() {
    const res = await funAddJokowiEffect({ data: dataJokowi, textContent: textContent });
    // await funLogUser({act:"ADD", desc:`User Add Data Setting User With User ID  ${id}`})
    toast("Success", {theme: "dark"});
    setOpenModal(false);
    // router.push("/dashboard-admin/jokowi-effect")
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

