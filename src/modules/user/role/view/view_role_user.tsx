"use client"
import { ActionIcon, Box, Button, Center, Group, Modal, Stack, Table, Text, Title } from '@mantine/core';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { MdDelete, MdOutlineModeEdit } from 'react-icons/md';
import { isModalRoleUser } from '../val/isModalUserRole';
import ModalUserRole from '../components/modal_del_user_role';
import funGetAllRole from '../fun/get_all_role';


/**
 * Fungsi untuk menampilkan view Role User.
 * @param {data} data - menampilkan data.
 * @returns Untuk menampilkan keseluruhan dari View Role User
 */
export default function ViewRoleUser({ data }: { data: any }) {
  const router = useRouter()
  const [isRole, setRole] = useState<any[]>(data)
  const [valOpenModal, setOpenModal] = useAtom(isModalRoleUser)
  const [dataDelete, setDataDelete] = useState("")


  async function delroledata() {
    const newData = await funGetAllRole()
    setRole(newData)
  }

  return (
    <>
      <Stack>
        <Title>ROLE USER</Title>
        <Group justify='flex-end'>
          <Button onClick={() => router.push("/dashboard-admin/role-user/add")} bg={"gray"}>Add User Role</Button>
        </Group>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>No</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>
                <Center>
                  Action
                </Center>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {isRole.map((v, i) => (
              <Table.Tr key={i}>
                <Table.Td>{i + 1}</Table.Td>
                <Table.Td>{v.name}</Table.Td>
                <Table.Td>
                  <Group justify="center">
                    <Box>
                      <ActionIcon
                        color="red.9"
                        onClick={() => {
                          setDataDelete(v.id)
                          setOpenModal(true)
                        }}
                        variant='subtle'
                      >
                        <MdDelete size="23" />
                      </ActionIcon>
                    </Box>
                    <Box>
                      <ActionIcon
                        color="yellow.9"
                        variant='subtle'
                        onClick={() => router.push(`/dashboard-admin/role-user/edit/${v.id}`)}
                      >
                        <MdOutlineModeEdit size="23" />
                      </ActionIcon>
                    </Box>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Stack>

      <Modal
        size={"md"}
        opened={valOpenModal}
        onClose={() => setOpenModal(false)}
        centered
        withCloseButton={false}
        closeOnClickOutside={false}
      >
        <ModalUserRole id={dataDelete} 
        onSuccess={(val) => {
          delroledata()
        }} />
      </Modal>
    </>
  );
}

