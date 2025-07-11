import { Alert, Box, Button, Group, Text } from '@mantine/core';
import { useAtom } from 'jotai';
import React from 'react';
import { isModalDashboardLive } from '../val/isModalDashboardLive';
import toast from 'react-simple-toasts';
import funDelNotification from '../fun/delete_notification';
import { funLogUser } from '@/modules/user';

/**
 * Modal konfirmasi delete notifikasi untuk dashboard live.
 * Jika klik "NO" maka modal akan close,
 * jika klik "YES" maka sistem akan menjalankan proses delete notifikasi
 * @param id id data yang akan dihapus
 * @param onSuccess callback function
 * @returns komponen modal
 */

export default function ModalDeleteNotification({ id, onSuccess }: { id: any, onSuccess: (val: any) => void }) {
  const [valOpenModal, setOpenModal] = useAtom(isModalDashboardLive)

  async function DelNotification() {
    const del = await funDelNotification({ id: id })
    if (!del.success) return toast(del.message, { theme: "dark" })
    await funLogUser({ act: "DELETE", desc: `User Delete Data Notification (ID : ${id})` })
    toast("Success", { theme: "dark" });
    setOpenModal(false);
    onSuccess(true)
  }

  return (
    <>
      <Box>
        <Alert color="gray" variant="outline">
          <Text fw={700} ta={"center"} mb={20} mt={20}>ARE YOU SURE TO DELETE THIS DATA NOTIFICATION?</Text>
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
              onClick={() => DelNotification()}
            >
              YES
            </Button>
          </Group>
        </Alert>
      </Box>
    </>
  );
}