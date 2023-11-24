import { Alert, Box, Button, Group, Text } from '@mantine/core';
import { useAtom } from 'jotai';
import React from 'react';
import { isModalLayout } from '../val/isModalLayout';
import { useRouter } from 'next/navigation';
import { funLogUser } from '@/modules/user';
import { funLogout } from '@/modules/auth';
import toast from 'react-simple-toasts';

export default function ModalLogout() {
  const router = useRouter()
  const [valOpenModal, setOpenModal] = useAtom(isModalLayout)

  async function logoutYes() {
    await funLogUser({ act: 'LOGOUT', desc: 'User logout' })
    await funLogout()
    router.push(`/`)
    setOpenModal(false)
    toast("Logout Success", { theme: "dark" })
  }
  return (
    <>
      <Box>
        <Alert color="gray" variant="outline">
          <Text fw={700} ta={"center"} mb={20} mt={20}>
            ARE YOU SURE YOU WANT TO LOGOUT?
          </Text>
          <Group justify="space-between" pt={10}>
            <Button
              radius={10}
              color="gray.7"
              w={150}
              onClick={() => setOpenModal(false)}
            >
              NO
            </Button>
            <Button radius={10} color="gray.7" w={150} onClick={() => logoutYes()}>
              YES
            </Button>
          </Group>
        </Alert>
      </Box>
    </>
  );
}

