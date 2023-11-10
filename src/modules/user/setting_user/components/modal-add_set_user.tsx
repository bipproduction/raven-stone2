import { Alert, Box, Button, Group, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React from 'react';
import { isModalSetUser } from '../val/isModaSetUser';
import { useAtom } from 'jotai';
import funAddSetUser from '../fun/add_set_user';
import toast from 'react-simple-toasts';

export default function ModalAddSetUser({ dataUser }: { dataUser: any }) {
  const router = useRouter()
  const [valOpenModal, setOpenModal] = useAtom(isModalSetUser)

  async function addetUser() {
    const res = await funAddSetUser({ data: dataUser });
    if (!res.success) return toast(res.message);
    toast("Success");
    router.push("/dashboard-admin/setting-user")
    setOpenModal(false);
  }

  return (
    <>
      <Box>
        <Alert color="gray" variant="outline">
          <Text fw={700} ta={"center"} mb={20} mt={20}>ARE YOU SURE TO ADD THIS SETTING USER?</Text>
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
              onClick={addetUser}
            >
              YES
            </Button>
          </Group>
        </Alert>
      </Box>
    </>
  );
}

