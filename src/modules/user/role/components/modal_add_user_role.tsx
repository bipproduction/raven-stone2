import { Alert, Box, Button, Group, Text } from '@mantine/core';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import React from 'react';
import { isModalRoleUser } from '../val/isModalUserRole';
import funAddUserRole from '../fun/add_role_user';
import toast from 'react-simple-toasts';

export default function ModalAddUserRole({isName, value}: {isName: any, value: any}) {
  const router = useRouter()
  const [valOpenModal, setOpenModal] = useAtom(isModalRoleUser)

  async function addRole() {
    const create = await funAddUserRole({ name: isName, component: value })
    if (!create.success) return toast(create.message, { theme: "dark" });
    router.push("/dashboard-admin/role-user")
    setOpenModal(false);
  }

  return (
    <>
      <Box>
        <Alert color="gray" variant="outline">
          <Text fw={700} ta={"center"} mb={20} mt={20}>ARE YOU SURE TO ADD THIS ROLE USER?</Text>
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
              onClick={addRole}
            >
              YES
            </Button>
          </Group>
        </Alert>
      </Box>
    </>
  );
}

