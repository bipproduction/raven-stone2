import { Alert, Box, Button, Group, Text } from '@mantine/core';
import { useAtom } from 'jotai';
import React from 'react';
import { isModalSetUser } from '../val/isModaSetUser';
import funDelSetUser from '../fun/del_set_user';
import toast from 'react-simple-toasts';
import { funLogUser } from '../..';
import funSetActiveUser from '../fun/set_active_user';

/**
 * Fungsi untuk menampilkan Modal Delete Setting User.
 * @param {id} id - menampilkan id.
 * @param {onSuccess} onSuccess - menampilkan onSuccess.
 * @returns Untuk menampilkan Modal Delete Setting User
 */
export default function ModalDelSetUser({ id, onSuccess }: { id: any, onSuccess: (val: any) => void }) {
  const [valOpenModal, setOpenModal] = useAtom(isModalSetUser)

  async function delRole() {
    // const del = await funDelSetUser({ id: id })
    const del = await funSetActiveUser({ dataUpdate: id })
    if (!del.success) return toast(del.message, { theme: "dark" })
    await funLogUser({ act: "DELETE", desc: `User Delete Data User (ID: ${id})` })
    toast("Success", { theme: "dark" });
    setOpenModal(false);
    onSuccess(del.delData)
  }
  return (
    <>
      <Box>
        <Alert color="gray" variant="outline">
          <Text fw={700} ta={"center"} mb={20} mt={20}>ARE YOU SURE TO UPDATE STATUS THIS USER?</Text>
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
              onClick={delRole}
            >
              YES
            </Button>
          </Group>
        </Alert>
      </Box>
    </>
  );
}
