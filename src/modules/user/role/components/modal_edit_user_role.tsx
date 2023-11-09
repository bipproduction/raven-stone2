"use client"
import { Alert, Box, Button, Group, Text } from '@mantine/core';
import { useAtom } from 'jotai';
import React from 'react';
import { isModalRoleUser } from '../val/isModalUserRole';
import funUpdateUserRole from '../fun/update_user_role';
import toast from 'react-simple-toasts';
import { useRouter } from 'next/navigation';

export default function ModalEditUserRole({ data }: { data: any }) {
  const [valOpenModal, setOpenModal] = useAtom(isModalRoleUser)
  const router= useRouter()
  async function updateData() {
    const edit = await funUpdateUserRole({ data: data })
    if (!edit.success) return toast(edit.message, { theme: "dark" });
    toast("Success", { theme: "dark" });
    router.push("/dashboard-admin/role-user")
    setOpenModal(false);
  }


  return (
    <>
      <Box>
        <Alert color="gray" variant="outline">
          <Text fw={700} ta={"center"} mb={20} mt={20}>ARE YOU SURE TO EDIT THIS ROLE USER?</Text>
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
