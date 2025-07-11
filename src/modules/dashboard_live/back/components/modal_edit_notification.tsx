import { Alert, Box, Button, Group, Text } from '@mantine/core';
import { useAtom } from 'jotai';
import React from 'react';
import { isModalDashboardLive } from '../val/isModalDashboardLive';
import toast from 'react-simple-toasts';
import funUpdateNotification from '../fun/update_notification';
import { funLogUser } from '@/modules/user';

/**
 * Modal konfirmasi edit notifikasi untuk dashboard live.
 * Jika klik "NO" maka modal akan close,
 * jika klik "YES" maka sistem akan menjalankan proses edit notifikasi
 * @param data data yang akan diedit
 * @returns komponen modal
 */

export default function ModalEditNotification({ data }: { data: any }) {
  const [valOpenModal, setOpenModal] = useAtom(isModalDashboardLive)

  async function editNotification() {
    const edit = await funUpdateNotification({ data: data });
    if (!edit.success) return toast(edit.message, { theme: "dark" });
    await funLogUser({ act: "EDIT", desc: `User Add Data Notification (ID : ${data.id})` })
    toast("Success", { theme: "dark" });
    setOpenModal(false);
  }

  return (
    <>
      <Box>
        <Alert color="gray" variant="outline">
          <Text fw={700} ta={"center"} mb={20} mt={20}>ARE YOU SURE TO EDIT THIS DATA NOTIFICATION?</Text>
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
              onClick={() => editNotification()}
            >
              YES
            </Button>
          </Group>
        </Alert>
      </Box>
    </>
  );
}

