"use client"
import { Alert, Box, Button, Group, Text } from '@mantine/core';
import { useAtom } from 'jotai';
import React from 'react';
import { isModalRoleUser } from '../val/isModalUserRole';
import funUpdateUserRole from '../fun/update_user_role';
import toast from 'react-simple-toasts';
import { useRouter } from 'next/navigation';
import { funLogUser } from '../..';


/**
 * Fungsi untuk menampilkan Modal Edit User Role.
 * @param {id} id - menampilkan id.
 * @param {name} name - menampilkan name.
 * @param {component} component - menampilkan component.
 * @returns Untuk menampilkan Modal Edit User Role
 */
export default function ModalEditUserRole({ name, component, id }: { name: any, component: any, id: any }) {
  const [valOpenModal, setOpenModal] = useAtom(isModalRoleUser)
  const router = useRouter()

  async function updateData() {
    const edit = await funUpdateUserRole({ name: name, id: id, component: component })
    if (!edit.success) return toast(edit.message, { theme: "dark" });
    await funLogUser({ act: "EDIT", desc: `User Edit Data Role (ID :${id})` })
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
