"use client"
import React, { useState } from 'react';
import funGetOneRoleUser from '../fun/get_one_role_user';
import { useRouter } from 'next/navigation';
import toast from 'react-simple-toasts';
import funUpdateUserRole from '../fun/update_user_role';
import { theme } from '../../../../../theme';
import { useAtom } from 'jotai';
import { isModalRoleUser } from '../val/isModalUserRole';
import { Box, Button, Grid, Modal, Stack, Text, TextInput } from '@mantine/core';
import { ButtonBack } from '@/modules/_global';
import { useFocusTrap } from '@mantine/hooks';
import { WARNA } from '@/modules/_global/fun/COLOR';
import ModalEditUserRole from '../components/modal_edit_user_role';

export default function ViewEditRoleUser({ data }: { data: any }) {
  const focusTrapRef = useFocusTrap();
  const router = useRouter()
  const [listData, setListData] = useState(data)
  const [valOpenModal, setOpenModal] = useAtom(isModalRoleUser)

  function validationData() {
    if (Object.values(listData).includes(""))
      return toast("The form cannot be empty", { theme: "dark" });
    setOpenModal(true);
  }
  return (
    <>
      <Stack>
        <ButtonBack />
        <Box>
          <Grid>
            <Grid.Col span={{md: 6, lg: 6}}  >
              <Box
                style={{
                  border: `1px solid #474747`,
                  padding: 20,
                  borderRadius: 10,
                }}
                ref={focusTrapRef}
              >
                <Stack>
                  <Text>Edit Role User</Text>
                  <TextInput placeholder="Name" value={listData.name} onChange={(val) => {
                    setListData({
                      ...listData, name: val.target.value
                    })
                  }} />
                  <Button fullWidth radius={10} color="gray.7" onClick={validationData}>SUBMIT</Button>
                </Stack>
              </Box>
            </Grid.Col>
          </Grid>
        </Box>
      </Stack>
      <Modal
      size={"md"}
      opened={valOpenModal}
      onClose={()=>{setOpenModal(false)}}
      centered
      withCloseButton={false}
      closeOnClickOutside={false}
      >
        <ModalEditUserRole data={listData}/>
      </Modal>
    </>
  );
}
