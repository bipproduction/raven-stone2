"use client"
import { Box, Button, Checkbox, Group, Modal, SimpleGrid, Stack, TextInput } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import funAddUserRole from '../fun/add_role_user';
import toast from 'react-simple-toasts';
import { values } from 'lodash';
import { useAtom } from 'jotai';
import { isModalRoleUser } from '../val/isModalUserRole';
import { ButtonBack } from '@/modules/_global';
import ModalAddUserRole from '../components/modal_add_user_role';

export default function ViewAddRoleUser({ data }: { data: any }) {
  const router = useRouter()
  const [isComponents, setIsComponents] = useState<any[]>(data)
  const [value, setValue] = useState<number[]>([])
  const [isName, setName] = useState("")
  const [valOpenModal, setOpenModal] = useAtom(isModalRoleUser)
  
  function validationData() {
    if (Object.values(isName).includes(""))
      return toast("The form cannot be empty", { theme: "dark" });
    if (value.length < 1 || (value.length == 0))
      return toast("User role cannot be empty", { theme: "dark" });
    setOpenModal(true);
  }
  return (
    <>
      <Stack>
        <ButtonBack />
        <TextInput
          placeholder='Create Role User'
          value={isName}
          onChange={(val) =>
            setName(val.target.value)
          }
        />
        {isComponents.map((v, i) => (
          <Group key={i}>
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
          </Group>
        ))}
        <Button color="gray.7" onClick={validationData}>
          SUBMIT
        </Button>

      </Stack>
      <Modal
        size={"md"}
        opened={valOpenModal}
        onClose={() => { setOpenModal(false) }}
        centered
        withCloseButton={false}
        closeOnClickOutside={false}
      >
        <ModalAddUserRole isName={isName} value={value} />
      </Modal>
    </>
  );
}

