"use client"
import { ButtonBack, WARNA } from '@/modules/_global';
import { ActionIcon, Box, Button, Group, Modal, Select, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { DateInput, TimeInput } from '@mantine/dates';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { Editor, useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import { CiPickerEmpty } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { time } from 'console';
import { cookies } from 'next/headers';
import toast from 'react-simple-toasts';
import { useAtom } from 'jotai';
import { isModalJokowi } from '../val/modal_jokowi';
import ModalAddJokowiEffect from '../component/modal_add_jokowi_effect';
import { useShallowEffect } from '@mantine/hooks';
import funCekAddJokowiEffect from '../fun/cek_add_jokowi_effect';


export default function ViewAddAdminJokowi() {
  const is_client = useState(false)

  useShallowEffect(() => {
    if (window) is_client[1](true)
  }, [])
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [valOpenModal, setOpenModal] = useAtom(isModalJokowi)

  const pickerControl = (
    <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
      <AiOutlineClockCircle style={{ width: "70%", height: "70%" }} />
    </ActionIcon>
  );


  const [isContent, setContent] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextStyle,
      Color,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: isContent,
  });

  const [isDataJokowi, setIsDataJokowi] = useState({
    dateContent: "",
    timeContent: ""
  })

  function validationData() {
    if (Object.values(isDataJokowi).includes(""))
      return toast("The form cannot be empty", { theme: "dark" });
    setOpenModal(true);
  }

  const [dataTanggal, setDataTanggal] = useState(null)
  const [dataWaktu, setDataWaktu] = useState(null)

  async function cekJokowi(isDate: any) {
    const tgl = moment(isDate).format('YYYY-MM-DD')
        const cek = await funCekAddJokowiEffect({ tanggal: new Date(tgl), waktu: "" })
        if (cek.ada) {
          setDataTanggal(null)
          setDataWaktu(null)
          return toast("Sudah Ada Data Waktu Yang Sama", {theme: "dark"})
        }
  }
  return (
    <>
      <Stack>
        <ButtonBack />
        <Group pt={30}>
          <Text fw={"bold"}>ADD JOKOWI EFFECT</Text>
        </Group>
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 2 }}
          spacing={{ base: 10, sm: "xl" }}
        >
          <Box>
            <DateInput valueFormat="DD-MM-YYYY" required
              label={"Tanggal"}
              placeholder="Pilih Tanggal"
              onChange={(e) => {
                setIsDataJokowi({
                  ...isDataJokowi,
                  dateContent: moment(e).format("YYYY-MM-DD"),
                });
              }}
            />
          </Box>
          <Box>
            <TimeInput
              label="Klik Icon Waktu"
              required ref={ref}
              rightSection={pickerControl}
              onChange={(val) => {
                setIsDataJokowi({
                  ...isDataJokowi,
                  timeContent: String(val.target.value)
                })
              }}
            />
          </Box>
        </SimpleGrid>
        <Box pt={30}>
          <RichTextEditor editor={editor}>
            <RichTextEditor.Toolbar sticky stickyOffset={60}>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.Strikethrough />
                <RichTextEditor.ClearFormatting />
                <RichTextEditor.Highlight />
                <RichTextEditor.Code />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
                <RichTextEditor.H4 />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Blockquote />
                <RichTextEditor.Hr />
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />
                <RichTextEditor.Subscript />
                <RichTextEditor.Superscript />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link />
                <RichTextEditor.Unlink />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.AlignLeft />
                <RichTextEditor.AlignCenter />
                <RichTextEditor.AlignJustify />
                <RichTextEditor.AlignRight />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ColorPicker
                colors={[
                  '#25262b',
                  '#868e96',
                  '#fa5252',
                  '#e64980',
                  '#be4bdb',
                  '#7950f2',
                  '#4c6ef5',
                  '#228be6',
                  '#15aabf',
                  '#12b886',
                  '#40c057',
                  '#82c91e',
                  '#fab005',
                  '#fd7e14',
                ]}
              />

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Control interactive={false}>
                  <CiPickerEmpty size="1rem" stroke={1.5} />
                </RichTextEditor.Control>
                <RichTextEditor.Color color="#F03E3E" />
                <RichTextEditor.Color color="#7048E8" />
                <RichTextEditor.Color color="#1098AD" />
                <RichTextEditor.Color color="#37B24D" />
                <RichTextEditor.Color color="#F59F00" />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.UnsetColor />
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content />
          </RichTextEditor>
        </Box>
      </Stack>
      <Group justify='flex-end' pt={20}>
        <Button color={"gray"} w={200} onClick={validationData}>SUBMIT</Button>
      </Group>
      <Modal
        size={"md"}
        opened={valOpenModal}
        onClose={() => { setOpenModal(false) }}
        centered
        withCloseButton={false}
        closeOnClickOutside={false}
      >
       <ModalAddJokowiEffect dataJokowi={isDataJokowi} textContent={editor?.getHTML()} />
      </Modal>
    </>
  );
}
