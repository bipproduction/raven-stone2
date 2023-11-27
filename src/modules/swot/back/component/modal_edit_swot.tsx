import { Alert, Box, Button, Group, Text } from '@mantine/core';
import { useAtom } from 'jotai';
import React from 'react';
import { isModalSwot } from '../val/modal_swot';
import funUpdateSwot from '../fun/update_swot';
import toast from 'react-simple-toasts';

export default function ModalEditSwot({dataSwot, textContent}: {dataSwot: any, textContent: any}) {
  const [valOpenModal, setOpenModal] = useAtom(isModalSwot)

  async function editSwot() {
      const res = await funUpdateSwot({ data: dataSwot, textContent: textContent });
      if (!res.success) return toast("Failed! " + res.message, { theme: "dark" });
      // await funLogUser({ act: "ADD", desc: `User Add Data ML-AI (ID : ${res.id})` })
      toast("Success", { theme: "dark" });
      setOpenModal(false);
  }
  return (
    <>
      <Box>
        <Alert color="gray" variant="outline">
          <Text fw={700} ta={"center"} mb={20} mt={20}>ARE YOU SURE TO EDIT THIS SWOT?</Text>
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
              onClick={() => editSwot()}
            >
              YES
            </Button>
          </Group>
        </Alert>
      </Box>
    </>
  );
}

