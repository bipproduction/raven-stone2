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
import toast from 'react-simple-toasts';
import moment from 'moment';
import { useAtom } from 'jotai';
import { isModalMlai } from '../val/modal_mlai';
import ModalAddMlAi from '../component/modal_add_ml_ai';

/**
 * Fungsi untuk menampilkan view add admin ml ai.
 * @param {params} params - menampilkan params.
 * @param {paslon} paslon - menampilkan paslon.
 * @returns Untuk menampilkan view add admin ml ai
 */

export default function ViewAddAdminMlai({ params, paslon, }: { params: any, paslon: any, }) {
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [dataPaslon, setDataPaslon] = useState(paslon)
  const [isPaslon, setPaslon] = useState<any>(params.idPaslon || null)
  const [isDate, setDate] = useState<any>(params.date)
  const [valOpenModal, setOpenModal] = useAtom(isModalMlai)
  const [isContent, setContent] = useState('')


  CiPickerEmpty
  useEffect(() => {
    setPaslon(params.idPaslon == 0 ? null : params.idPaslon)
  }, [params])

  const pickerControl = (
    <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
      <AiOutlineClockCircle style={{ width: "70%", height: "70%" }} />
    </ActionIcon>
  );

  let editor = useEditor({
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
    content: isContent
  });

  const [isDataMlAi, setDataMlAi] = useState({
    idPaslon: "",
    dateContent: "",
    timeContent: ""
  })

  function validationData() {
    if (Object.values(isDataMlAi).includes("") || editor?.getHTML() == '<p></p>')
      return toast("The form cannot be empty", { theme: "dark" });
    setOpenModal(true);

  }

  return (
    <>
      <Stack>
        <ButtonBack />
        <Group pt={30}>
          <Text fw={"bold"}>ADD ML AI</Text>
        </Group>
        <SimpleGrid
          cols={{ base: 1, sm: 3, lg: 3 }}
          spacing={{ base: 10, sm: "xl" }}
        >
          <Box>
            <Select
              label={"Paslon"}
              required
              placeholder='Pilih Paslon'
              data={dataPaslon.map((pro: any) => ({
                value: String(pro.id),
                label: pro.name
              }))}
              value={(isDataMlAi.idPaslon == "" ? null : isDataMlAi.idPaslon)}
              onChange={(val: any) =>
                setDataMlAi({
                  ...isDataMlAi,
                  idPaslon: val
                })
              }
            />
          </Box>
          <Box>
            <DateInput valueFormat="DD-MM-YYYY" required
              label={"Tanggal"}
              placeholder="Pilih Tanggal"
              value={(isDataMlAi.dateContent == '') ? null : new Date(isDataMlAi.dateContent)}
              onChange={(e) => {
                setDataMlAi({
                  ...isDataMlAi,
                  dateContent: moment(e).format("YYYY-MM-DD"),
                });
              }}
            />
          </Box>
          <Box>
            <TimeInput
              label="Jam"
              required ref={ref}
              rightSection={pickerControl}
              value={isDataMlAi.timeContent}
              onChange={(val) =>
                setDataMlAi({
                  ...isDataMlAi,
                  timeContent: String(val.target.value)
                })
              } />
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
                  <CiPickerEmpty size="1rem" stroke="1.5" />
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
        <Button color={"gray"} w={200} onClick={() => validationData()}>SUBMIT</Button>
      </Group>
      <Modal
        size={"md"}
        opened={valOpenModal}
        onClose={() => { setOpenModal(false) }}
        centered
        withCloseButton={false}
        closeOnClickOutside={false}
      >
        <ModalAddMlAi dataMlAi={isDataMlAi} textContent={editor?.getHTML()} onSuccess={() => {
          editor?.commands.setContent('<p></p>')
          setDataMlAi({
            ...isDataMlAi,
            idPaslon: "",
            dateContent: '',
            timeContent: '',
          });
        }} />
      </Modal>
    </>
  );
}

