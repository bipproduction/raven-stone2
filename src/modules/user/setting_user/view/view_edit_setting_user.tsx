'use client'
import { ButtonBack } from '@/modules/_global';
import { Box, Button, Grid, Modal, Select, Stack, Text, TextInput } from '@mantine/core';
import { useFocusTrap } from '@mantine/hooks';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { isModalSetUser } from '../val/isModaSetUser';
import toast from 'react-simple-toasts';
import ModalEditSetUser from '../components/modal_edit_set_user';

export default function ViewEditSettingUser({ roleUser, data }: { roleUser: any, data: any }) {
  const focusTrapRef = useFocusTrap();
  const [isDataRole, setIsDataRole] = useState<any[]>(roleUser)
  const [dataUser, setDataUser] = useState(data)
  const [valOpenModal, setOpenModal] = useAtom(isModalSetUser)

  function validasiUser() {
    if (Object.values(dataUser).includes(""))
      return toast("The form cannot be empty", { theme: "dark" });
    setOpenModal(true);
  }


  return (
    <>
      <Stack>
        <ButtonBack />
        <Box
          style={{
            border: "1px solid #474747",
            padding: 20,
            borderRadius: 10
          }}
          ref={focusTrapRef}
        >
          <Text mb={20} fw={"bold"}>EDIT SETTING USER</Text>
          <Select
            placeholder='User Role'
            label={"Role User"}
            required
            mt={10}
            data={isDataRole.map((role) => ({
              value: String(role.id),
              label: role.name
            }))}
            onChange={(val: any) =>
              setDataUser({
                ...dataUser,
                idUserRole: val
              })
            }
            value={dataUser.idUserRole}
          />
          <TextInput
            onChange={(val) =>
              setDataUser({
                ...dataUser,
                name: val.target.value
              })
            }
            value={dataUser.name}
            placeholder='Name'
            label={"Name"}
            required
            mt={10}
          />
          <TextInput
            onChange={(val) =>
              setDataUser({
                ...dataUser,
                email: val.target.value
              })
            }
            value={dataUser.email}
            placeholder='Email'
            label={"Email"}
            required
            mt={10}
          />
          <TextInput
            onChange={(val) =>
              setDataUser({
                ...dataUser,
                password: val.target.value
              })
            }
            value={dataUser.password}
            placeholder='Password'
            label={"Password"}
            required
            mt={10}
          />
          <TextInput
            onChange={(val) =>
              setDataUser({
                ...dataUser,
                phone: val.target.value
              })
            }
            value={dataUser.phone}
            placeholder='62'
            label={"Phone"}
            required
            mt={10}
            type='number'
          />
          <Grid mt={20}>
            <Grid.Col span={{ md: 6, lg: 6 }}>
              <Button fullWidth bg={'gray'} onClick={validasiUser} >SUBMIT</Button>
            </Grid.Col>
          </Grid>
        </Box >
      </Stack>
      <Modal
        size={"md"}
        opened={valOpenModal}
        onClose={() => setOpenModal(false)}
        centered
        withCloseButton={false}
        closeOnClickOutside={false}
      >
        <ModalEditSetUser data={dataUser} id={dataUser.idUserRole}/>
      </Modal>
    </>
  );
}
