import { Alert, Box, Button, Group, Text } from '@mantine/core';
import React from 'react';
import { isModalLayoutUser } from '../val/isModalLayoutUser';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { funLogUser } from '@/modules/user';
import { funLogout } from '@/modules/auth';
import toast from 'react-simple-toasts';
import { WARNA } from '../../fun/COLOR';

export default function ModalLogoutUser() {
  const router = useRouter()
  const [valOpenModal, setOpenModal] = useAtom(isModalLayoutUser)

  async function logoutYes() {
    await funLogUser({ act: 'LOGOUT', desc: 'User logout dari sistem' })
    await funLogout()
    toast("Logout Success", { theme: "dark" })
    router.push('/')
  }
  return (
    <>
      <Box>
        <Alert variant="outline" color={WARNA.ungu} >
          <Text fw={700} ta={"center"} mb={20} mt={20}>
            ARE YOU SURE YOU WANT TO LOGOUT?
          </Text>
          <Group justify="space-between" pt={10}>
            <Button
              radius={10}
              color={"white"}
              w={150}
              onClick={() => setOpenModal(false)}
              bg={WARNA.merah}
            >
              NO
            </Button>
            <Button radius={10} color={"white"} bg={WARNA.hijau} w={150} onClick={() => logoutYes()}>
              YES
            </Button>
          </Group>
        </Alert>
      </Box>
    </>
  );
}