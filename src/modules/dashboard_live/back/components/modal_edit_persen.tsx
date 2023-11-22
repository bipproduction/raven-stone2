import { Alert, Box, Button, Group, Text } from '@mantine/core';
import { useAtom } from 'jotai';
import React from 'react';
import { isModalDashboardLive } from '../val/isModalDashboardLive';
import toast from 'react-simple-toasts';
import funUpdatePersen from '../fun/update_persen';

export default function ModalEditPersen({data}: {data: any}) {
  const [valOpenModal, setOpenModal] = useAtom(isModalDashboardLive)

  async function editPersen() {
    const edit = await funUpdatePersen({ data: data });
    if (!edit.success) return toast(edit.message, { theme: "dark" });
    toast("Success", { theme: "dark" });
    setOpenModal(false);
  }

  return (
    <>
      <Box>
        <Alert color="gray" variant="outline">
          <Text fw={700} ta={"center"} mb={20} mt={20}>ARE YOU SURE TO EDIT THIS DATA PERSEN?</Text>
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
              onClick={() => editPersen()}
            >
              YES
            </Button>
          </Group>
        </Alert>
      </Box>
    </>
  );
}

