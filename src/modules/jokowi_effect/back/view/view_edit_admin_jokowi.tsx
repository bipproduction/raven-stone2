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
import toast from 'react-simple-toasts';
import { useAtom } from 'jotai';
import { isModalJokowi } from '../val/modal_jokowi';
import ModalEditJokowiEffect from '../component/modal_edit_jokowi_effect';

export default function ViewEditAdminJokowi({ data }: { data: any }) {
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [dataJokowi, setDataJokowi] = useState({
    id: data.id,
    dateContent: moment(data.dateContent).format('YYYY-MM-DD'),
    timeContent: moment.utc(data.timeContent).format('HH:mm'),
    content: data.content
  })
  const [valOpenModal, setOpenModal] = useAtom(isModalJokowi)

  const content = ''

  const pickerControl = (
    <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
      <AiOutlineClockCircle style={{ width: "70%", height: "70%" }} />
    </ActionIcon>
  );

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
    content: dataJokowi.content
  });

  function validasiUser() {
    if (Object.values(dataJokowi).includes("") || editor?.getHTML() == '<p></p>')
      return toast("The form cannot be empty", { theme: "dark" });
    setOpenModal(true);
  }


  return (
    <>
      <Stack>
        <ButtonBack />
        <Group pt={30}>
          <Text fw={"bold"}>EDIT JOKOWI EFFECT</Text>
        </Group>
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 2 }}
          spacing={{ base: 10, sm: "xl" }}
        >
          <Box>
            <DateInput valueFormat="DD-MM-YYYY" required
              label={"Tanggal"}
              placeholder="Pilih Tanggal"
              onChange={(val: any) =>
                setDataJokowi({
                  ...dataJokowi,
                  dateContent: moment(val).format('YYYY-MM-DD'),
                })
              }
              defaultValue={new Date(dataJokowi.dateContent)}
            />
          </Box>
          <Box>
            <TimeInput
              label="Jam"
              required ref={ref}
              rightSection={pickerControl}
              onChange={(val: any) =>
                setDataJokowi({
                  ...dataJokowi,
                  timeContent: String(val.target.value)
                })
              }
              defaultValue={dataJokowi.timeContent}
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
        <Button color={"gray"} w={200} onClick={() => validasiUser()}>EDIT</Button>
      </Group>
      <Modal
        size={"md"}
        opened={valOpenModal}
        onClose={() => { setOpenModal(false) }}
        centered
        withCloseButton={false}
        closeOnClickOutside={false}
      >
        <ModalEditJokowiEffect dataJokowi={dataJokowi} textContent={editor?.getHTML()} />
      </Modal>
    </>
  );
}
