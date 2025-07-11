"use client"
import { ActionIcon, Box, Button, Center, Group, Modal, Stack, Switch, Table, Title } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { MdDelete, MdOutlineModeEdit } from 'react-icons/md';
import { isModalSetUser } from '../val/isModaSetUser';
import { useAtom } from 'jotai';
import { funGetAllSetUser } from '../fun/get_all_set_user';
import ModalDelSetUser from '../components/modal_del_set_user';

/**
 * Fungsi untuk menampilkan view Setting User.
 * @param {data} data - menampilkan data.
 * @returns Untuk menampilkan keseluruhan dari View Setting User
 */
export default function ViewSettingUser({ data }: { data: any }) {
  const router = useRouter()
  const [lisData, setListData] = useState<any[]>(data)
  const [valOpenModal, setOpenModal] = useAtom(isModalSetUser)
  // const [dataDelete, setDataDelete] = useState("")
  const [dataDelete, setDataDelete] = useState({
    idUser: "",
    active: false
  })

  async function deluser() {
    const newData = await funGetAllSetUser()
    setListData(newData)
  }

  return (
    <>

      <Stack>
        <Title>SEETING USER</Title>
        <Group justify='flex-end'>
          <Button onClick={() => router.push("/dashboard-admin/setting-user/add")} bg={'gray'}>Add Setting User</Button>
        </Group>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>No</Table.Th>
              <Table.Th>User Role</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Password</Table.Th>
              <Table.Th>Phone</Table.Th>
              <Table.Th>
                <Center>
                  Active
                </Center>
              </Table.Th>
              <Table.Th>
                <Center>
                  Action
                </Center>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {lisData.map((v, i) => (
              <Table.Tr key={i}>
                <Table.Td>{i + 1}</Table.Td>
                <Table.Td>{v.UserRole}</Table.Td>
                <Table.Td>{v.name}</Table.Td>
                <Table.Td>{v.email}</Table.Td>
                <Table.Td>{v.password}</Table.Td>
                <Table.Td>{v.phone}</Table.Td>
                <Table.Td>
                  <Group justify="center">
                    <Switch checked={v.isActive} size="md" onLabel="ON" offLabel="OFF" onChange={(val) => {
                      setOpenModal(true)
                      setDataDelete({
                        ...dataDelete,
                        idUser: v.id,
                        active: val.currentTarget.checked
                      })
                    }} />
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Group justify="center">
                    {/* <Box>
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
                    </Box> */}
                    <Box>
                      <ActionIcon
                        color="yellow.9"
                        variant='subtle'
                        onClick={() => router.push(`/dashboard-admin/setting-user/edit/${v.id}`)}
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
        <ModalDelSetUser id={dataDelete}
          onSuccess={(val) => {
            deluser()
          }} />
      </Modal>
    </>
  );
}

