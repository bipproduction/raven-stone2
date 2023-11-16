import { Alert, Box, Button, Group, Text } from '@mantine/core';
import React from 'react';
import funAddMlAi from '../fun/add_ml_ai';
import toast from 'react-simple-toasts';
import { useAtom } from 'jotai';
import { isModalMlai } from '../val/modal_mlai';

export default function ModalAddMlAi({dataMlAi, textContent}: {dataMlAi: any, textContent: any}) {
  const [valOpenModal, setOpenModal] = useAtom(isModalMlai)

  async function addJokowi() {
    const res = await funAddMlAi({ data: dataMlAi, textContent: textContent });
    toast("Success", {theme: "dark"});
    setOpenModal(false);
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
