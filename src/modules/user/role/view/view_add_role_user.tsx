"use client"
import { Box, Button, Checkbox, Stack, TextInput } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import funAddUserRole from '../fun/add_role_user';
import toast from 'react-simple-toasts';

export default function ViewAddRoleUser({ data }: { data: any }) {
  const router = useRouter()
  const [isComponents, setIsComponents] = useState<any[]>(data)
  const [value, setValue] = useState<number[]>([])
  const [isName, setName] = useState({
    name: "",
  })

  async function addRole() {
    const create = await funAddUserRole({ name: isName, component: value })
    if (!create.success) return toast(create.message, { theme: "dark" });
  }


  return (
    <>
      <Stack>
        <pre>
          {JSON.stringify(isComponents, null, 1)}
        </pre>

        <TextInput
          placeholder='Create Role User'
          value={isName.name}
          onChange={(val) => 
            setName({
              ...isName,
              name: val.target.value
            })
          }
        />
        {isComponents.map((v, i) => (
          <Box key={i}>
            <Checkbox
              aria-label="Select row"
              checked={value.includes(v.id)}
              label={v.menu}
              onChange={(event) =>
                setValue(
                    event.currentTarget.checked
                    ? [...value, v.id]
                    : value.filter((id) => id !== v.id)
                )
              }
            />
          </Box>
        ))}
        <Button color="gray.7" onClick={addRole}>
          SUBMIT
        </Button>

      </Stack>
    </>
  );
}

