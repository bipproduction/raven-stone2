import { Button, Group, Stack, Table, Text } from '@mantine/core';
import React from 'react';

export default function ViewRoleUser() {
  return (
    <>
      <Stack>
        <Text>ROLE USER</Text>
        <Group>
          <Button>Add User Role</Button>
        </Group>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>No</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td></Table.Td>
              <Table.Td></Table.Td>
              <Table.Td></Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Stack>
    </>
  );
}

