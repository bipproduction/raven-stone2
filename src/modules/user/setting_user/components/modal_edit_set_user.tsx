import { Alert, Box, Button, Group, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React from 'react';
import { isModalSetUser } from '../val/isModaSetUser';
import { useAtom } from 'jotai';
import funUpdateSetUser from '../fun/update_set_user';
import toast from 'react-simple-toasts';

export default function ModalEditSetUser({data}: {data: any}) {
  const [valOpenModal, setOpenModal] = useAtom(isModalSetUser)
  const router= useRouter()

  async function updateData() {
    const edit = await funUpdateSetUser({ data: data })
    if (!edit.success) return toast(edit.message, { theme: "dark" });
    toast("Success", { theme: "dark" });
    router.push("/dashboard-admin/setting-user")
    setOpenModal(false);
  }

  return (
    <>
      <Box>
        <Alert color="gray" variant="outline">
          <Text fw={700} ta={"center"} mb={20} mt={20}>ARE YOU SURE TO EDIT THIS SETTING USER?</Text>
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
              onClick={updateData}
            >
              YES
            </Button>
          </Group>
        </Alert>
      </Box>
    </>
  );
}