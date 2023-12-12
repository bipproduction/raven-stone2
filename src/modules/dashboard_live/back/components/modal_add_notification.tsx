import { Alert, Box, Button, Group, Text } from '@mantine/core';
import { useAtom } from 'jotai';
import React from 'react';
import { isModalDashboardLive } from '../val/isModalDashboardLive';
import toast from 'react-simple-toasts';
import funAddNotification from '../fun/add_notification';
import { funLogUser } from '@/modules/user';

/**
 * Modal konfirmasi tambah notifikasi untuk dashboard live.
 * Jika klik "NO" maka modal akan close,
 * jika klik "YES" maka sistem akan menjalankan proses tambah notifikasi
 * @param isData data yang akan ditambah
 * @returns komponen modal
 */


export default function ModalAddNotification({ isData }: { isData: any }) {
  const [valOpenModal, setOpenModal] = useAtom(isModalDashboardLive)

  async function addNotification() {
    const create = await funAddNotification({ data: isData })
    if (!create.success) return toast(create.message, { theme: "dark" });
    await funLogUser({ act: "ADD", desc: `User Add Data Notification (ID : ${create.id})` })
    toast("Success", { theme: "dark" });
    setOpenModal(false);
  }

  return (
    <>
      <Box>
        <Alert color="gray" variant="outline">
          <Text fw={700} ta={"center"} mb={20} mt={20}>ARE YOU SURE TO ADD THIS DATA NOTIFICATION?</Text>
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
              onClick={() => addNotification()}
            >
              YES
            </Button>
          </Group>
        </Alert>
      </Box>
    </>
  );
}

