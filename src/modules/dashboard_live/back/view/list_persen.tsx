"use client"
import { ActionIcon, Box, Center, Divider, Group, Stack, Table, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';

const paslon = [
  {
    id: 1,
    paslon: "Prabowo - Gibran",
    negative: "21.89 %",
    positive: "54.89 %",
    neutral: "21.89 %",
  },
  {
    id: 2,
    paslon: "Ganjar - Mahfud",
    negative: "21.89 %",
    positive: "24.89 %",
    neutral: "21.89 %",
  },
  {
    id: 3,
    paslon: "Anies - Muhaimin",
    negative: "21.89 %",
    positive: "34.89 %",
    neutral: "21.89 %",
  }
]

export default function ListPersen() {
  const router = useRouter()
  return (
    <>
      <Group pb={10}>
        <Text fw={"bold"}>DATA PASLON</Text>
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
              <Table.Th >Paslon</Table.Th>
              <Table.Th >Positive</Table.Th>
              <Table.Th >Neutral</Table.Th>
              <Table.Th >Negative</Table.Th>
              <Table.Th>
                <Center>Aksi</Center>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          {paslon.map((v, i) => {
            return (
              <Table.Tbody key={i}>
                <Table.Tr>
                  <Table.Td>{i + 1}</Table.Td>
                  <Table.Td>{v.paslon}</Table.Td>
                  <Table.Td>{v.positive}</Table.Td>
                  <Table.Td>{v.neutral}</Table.Td>
                  <Table.Td>{v.negative}</Table.Td>
                  <Table.Td>
                    <Center>
                      <ActionIcon
                        variant="transparent"
                        color="green"
                        size="xl"
                        aria-label="Edit"
                      onClick={() => router.push(`/dashboard-admin/persen/${v.id}`)}
                      >
                        <CiEdit size={25} />
                      </ActionIcon>
                    </Center>
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            )
          })}
        </Table>
      </Box>
    </>
  );
}