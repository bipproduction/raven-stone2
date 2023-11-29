'use client'
import { useEditor } from '@tiptap/react';
import React, { useState } from 'react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import { Link, RichTextEditor } from '@mantine/tiptap';
import { useAtom } from 'jotai';
import { isModalSwot } from '../val/modal_swot';
import toast from 'react-simple-toasts';
import { Box, Button, Group, Modal, Select, SimpleGrid, Stack, Text } from '@mantine/core';
import { ButtonBack } from '@/modules/_global';
import { CiPickerEmpty } from 'react-icons/ci';
import ModalAddSwot from '../component/modal_add_swot';


/**
 * Fungsi untuk menampilkan view Add Swot.
 * @param {candidate} candidate - menampilkan candidate.
 * @returns Untuk menampilkan Hsil dari View Add Swot
 */
export default function ViewAddSwot({ candidate }: { candidate: any }) {
  const [isContent, setContent] = useState('')
  const [dataCandidate, setDataCandidate] = useState(candidate)
  const [valOpenModal, setOpenModal] = useAtom(isModalSwot)
  const dCategory = [
    {
      val: "STRENGTH"
    },
    {
      val: "WEAKNESS"
    },
    {
      val: "OPPORTUNITY"
    },
    {
      val: "THREAT"
    }
  ]

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

  const [isDataSwot, setDataSwot] = useState({
    idCandidate: "",
    category: "",
  })

  function validationData() {
    if (Object.values(isDataSwot).includes("") || editor?.getHTML() == '<p></p>')
      return toast("The form cannot be empty", { theme: "dark" });
    setOpenModal(true);
  }

  return (
    <>
      <Stack>
        <ButtonBack />
        <Group pt={30}>
          <Text fw={"bold"}>ADD SWOT</Text>
        </Group>
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 2 }}
          spacing={{ base: 10, sm: "xl" }}
        >
          <Box>
            <Select
              label={"Kandidat"}
              required
              placeholder='Pilih Kandidat'
              data={dataCandidate.map((pro: any) => ({
                value: String(pro.id),
                label: pro.name
              }))}
              onChange={(val: any) =>
                setDataSwot({
                  ...isDataSwot,
                  idCandidate: (val == null) ? '' : val
                })
              }
            />
          </Box>
          <Box>
            <Select
              label={"Kategori"}
              required
              placeholder='Pilih Kategori'
              data={dCategory.map((pro: any) => ({
                value: String(pro.val),
                label: pro.val
              }))}
              onChange={(val: any) =>
                setDataSwot({
                  ...isDataSwot,
                  category: (val == null) ? '' : val
                })
              }
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
        <ModalAddSwot dataSwot={isDataSwot} textContent={editor?.getHTML()} />
      </Modal>
    </>
  );
}

