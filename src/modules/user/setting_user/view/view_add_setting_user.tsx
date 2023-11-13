"use client"
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { isModalSetUser } from '../val/isModaSetUser';
import { Box, Button, Grid, GridCol, Modal, NumberInput, Select, Stack, Text, TextInput } from '@mantine/core';
import { ButtonBack } from '@/modules/_global';
import { useFocusTrap } from '@mantine/hooks';
import toast from 'react-simple-toasts';
import funAddSetUser from '../fun/add_set_user';
import ModalAddSetUser from '../components/modal-add_set_user';

export default function ViewAddSettingUser({ roleUser }: { roleUser: any }) {
  const focusTrapRef = useFocusTrap();
  const [valOpenModal, setOpenModal] = useAtom(isModalSetUser)
  const [isRoleUser, setRoleUser] = useState<any[]>(roleUser)

  async function dataRole({ idRole }: { idRole: any }) {
    setRoleUser(idRole)
  }

  const [dataUser, setDataUser] = useState({
    idUserRole: Number(),
    name: "",
    email: "",
    password: "",
    phone: ""
  })

  function validationData() {
    if (Object.values(dataUser).includes(""))
      return toast("The form cannot be empty", { theme: "dark" });
    setOpenModal(true);
  }
  // async function addData() {
  //   if (Object.values(dataUser).includes(""))
  //     return toast("Lengkapi Data Anda");

  //   const res = await funAddSetUser({data: dataUser});
  //   if (!res.success) return toast(res.message);
  //   toast("Success");
  // }

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
          <Text mb={20} fw={"bold"}>ADD SETTING USER</Text>
          <Select
            placeholder='User Role'
            data={isRoleUser.map((role) => ({
              value: String(role.id),
              label: role.name
            }))}
            onChange={(val: any) =>
              setDataUser({
                ...dataUser,
                idUserRole: val
              })
            }
            label={"Role User"}
            required
            mt={10}
          />
          <TextInput
            onChange={(val) =>
              setDataUser({
                ...dataUser,
                name: val.target.value
              })
            }
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
            placeholder='62'
            label={"Phone"}
            required
            mt={10}
            type='number'
          />
          <Grid mt={20}>
            <Grid.Col span={{ md: 6, lg: 6 }}>
              <Button fullWidth bg={'gray'} onClick={validationData}>SUBMIT</Button>
            </Grid.Col>
          </Grid>
        </Box >
      </Stack>
      <Modal
        size={"md"}
        opened={valOpenModal}
        onClose={() => { setOpenModal(false) }}
        centered
        withCloseButton={false}
        closeOnClickOutside={false}
      >
        <ModalAddSetUser dataUser={dataUser} id={dataUser.idUserRole}/>
      </Modal>
    </>
  );
}
