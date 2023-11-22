"use client"
import { WARNA } from '@/modules/_global';
import { ActionIcon, Box, Button, Center, Group, Modal, Stack, Table, Text } from '@mantine/core';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { isModalDashboardLive } from '../val/isModalDashboardLive';
import ModalDeleteNotification from '../components/modal_delete_notification';
import funGetAllNotification from '../fun/get_all_notification';


export default function ListNotification({ data }: { data: any }) {
  const [isDataNotif, setDataNotif] = useState<any[]>(data)
  const router = useRouter()
  const [valOpenModal, setOpenModal] = useAtom(isModalDashboardLive)
  const [dataDelete, setDataDelete] = useState("")

  async function onLoad() {
    const dataLoad = await funGetAllNotification()
    setDataNotif(dataLoad)
  }

  return (
    <>
      <Group pb={10} justify='space-between'>
        <Text fw={"bold"}>DATA NOTIFICATION</Text>
        <Button color='gray' onClick={() => router.push("/dashboard-admin/notifikasi/add")} >Add Notification</Button>
      </Group>
      <Box style={{
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10
      }}>
        <Table
          horizontalSpacing="xl"
        >
          <Table.Thead>
            <Table.Tr
              style={{
                borderBottom: "1px solid #CED4D9",
              }}
            >
              <Table.Th>No</Table.Th>
              <Table.Th >Notification</Table.Th>
              <Table.Th>
                <Center>Aksi</Center>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          {isDataNotif.map((v, i) => {
            return (
              <Table.Tbody key={i}>
                <Table.Tr>
                  <Table.Td>{i + 1}</Table.Td>
                  <Table.Td>{v.description}</Table.Td>
                  <Table.Td>
                    <Center>
                      <ActionIcon
                        variant="transparent"
                        color="green"
                        size="xl"
                        aria-label="Edit"
                        onClick={() => router.push(`/dashboard-admin/notifikasi/edit/${v.id}`)}
                      >
                        <CiEdit size={25} />
                      </ActionIcon>
                      <ActionIcon
                        variant="transparent"
                        color="rgba(209, 4, 4, 1)"
                        size="xl"
                        aria-label="Delete"
                        onClick={() => {
                          setDataDelete(v.id)
                          setOpenModal(true)
                        }}
                      >
                        <MdDelete size={20} />
                      </ActionIcon>
                    </Center>
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            )
          })}
        </Table>
      </Box>
      <Modal
        size={"md"}
        opened={valOpenModal}
        onClose={() => { setOpenModal(false) }}
        centered
        withCloseButton={false}
        closeOnClickOutside={false}
      >
        <ModalDeleteNotification
          id={dataDelete}
          onSuccess={(val) => {
            onLoad()
          }}
        />
      </Modal>
    </>
  );
}

