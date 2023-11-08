"use client"
import { ActionIcon, Box, Button, Center, Group, Stack, Table, Text, Title } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { MdDelete, MdOutlineModeEdit } from 'react-icons/md';

export default function ViewRoleUser({ data }: { data: any }) {
  const [isRole, setRole] = useState<any[]>(data)
  const router = useRouter()
  return (
    <>
      <Stack>
        <Title>ROLE USER</Title>
        <Group justify='flex-end'>
          <Button onClick={() => router.push("/dashboard-admin/role-user/add")}>Add User Role</Button>
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
                        // onClick={() => {
                        //   setDataDelete(v.id);
                        //   setOpenModal(true);
                        // }}
                        variant='subtle'
                      >
                        <MdDelete size="23" />
                      </ActionIcon>
                    </Box>
                    <Box>
                      <ActionIcon
                        color="yellow.9"
                        // onClick={() =>
                        //   router.push(
                        //     `/dashboard/configuration/projects-category/edit/${v.id}`
                        //   )
                        // }
                        variant='subtle'
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
    </>
  );
}

