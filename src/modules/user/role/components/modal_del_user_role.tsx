import { useAtom } from 'jotai';
import React from 'react';
import { isModalRoleUser } from '../val/isModalUserRole';
import { Alert, Box, Button, Group, Text } from '@mantine/core';
import funDelUserRole from '../fun/delete_user_role';
import toast from 'react-simple-toasts';
import { funLogUser } from '../..';

export default function ModalUserRole({ id, onSuccess }: { id: any, onSuccess: (val: any) => void }) {
  const [valOpenModal, setOpenModal] = useAtom(isModalRoleUser)

  async function delRole() {
    const del = await funDelUserRole({ id: id })
    if (!del.success) return toast(del.message, { theme: "dark" })
    await funLogUser({act:"DELETE", desc:`User Deletes Data Role With User ID  ${id}`})
    toast("Success", { theme: "dark" });
    setOpenModal(false);
    onSuccess(del.delData)
  }

  return (
    <>
      <Box>
        <Alert color="gray" variant="outline">
          <Text fw={700} ta={"center"} mb={20} mt={20}>ARE YOU SURE TO DELETE THIS ROLE USER?</Text>
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

