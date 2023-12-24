"use client"

import { useAtom } from "jotai"
import { useState } from "react"
import { isModalStep } from "../val/modal_step"
import { useEditor } from "@tiptap/react"
import { Link, RichTextEditor } from "@mantine/tiptap"
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import TextStyle from "@tiptap/extension-text-style"
import Color from "@tiptap/extension-color"
import toast from "react-simple-toasts"
import { Box, Button, Group, Modal, Select, SimpleGrid, Stack, Text } from "@mantine/core"
import { ButtonBack } from "@/modules/_global"
import { CiPickerEmpty } from "react-icons/ci"
import ModalEditStep from "../component/modal_edit_step"


/**
 * Fungsi untuk menampilkan view Edit Step.
 * @param {data} data - menampilkan data.
 * @param {dataCan} dataCan - menampilkan dataCan.
 * @returns Untuk menampilkan Hsil dari View Edit Step
 */
export default function ViewEditStep({ data, dataCan }: { data: any, dataCan: any }) {
    const [dataCandidate, setDatCandidate] = useState(dataCan)
    const [valOpenModal, setOpenModal] = useAtom(isModalStep)

    const dSentiment = [
        {
            val: 1,
            label: 'Positive'
        },
        {
            val: 2,
            label: 'Negative'
        },
    ]

    const dCategory = [
        {
            val: "SOCIAL"
        },
        {
            val: "TECHNOLOGY"
        },
        {
            val: "ECONOMY"
        },
        {
            val: "POLITIC"
        }
    ]
    const [isDataStep, setDataStep] = useState({
        id: data.id,
        idCandidate: data.idCandidate,
        category: data.category,
        sentiment: data.sentiment,
        content: data.content
    })

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
        content: isDataStep.content
      });
    
    
      function validationData() {
        if (Object.values(isDataStep).includes("") || editor?.getHTML() == '<p></p>')
          return toast("The form cannot be empty", { theme: "dark" });
        setOpenModal(true);
      }


    return (
        <>
        <Stack>
            <ButtonBack />
            <Group pt={30}>
                <Text fw={"bold"}>EDIT STEP</Text>
            </Group>
            <SimpleGrid
                cols={{ base: 1, sm: 3, lg: 3 }}
                spacing={{ base: 10, sm: "xl" }}
            >
                <Box>
                    <Select
                        label={"Kandidat"}
                        required
                        value={isDataStep.idCandidate}
                        placeholder='Pilih Kandidat'
                        data={dataCandidate.map((pro: any) => ({
                            value: String(pro.id),
                            label: pro.name
                        }))}
                        onChange={(val: any) =>
                            setDataStep({
                                ...isDataStep,
                                idCandidate: val
                            })
                        }
                    />
                </Box>
                <Box>
                    <Select
                        label={"Kategori"}
                        required
                        value={isDataStep.category}
                        placeholder='Pilih Kategori'
                        data={dCategory.map((pro: any) => ({
                            value: String(pro.val),
                            label: pro.val
                        }))}
                        onChange={(val: any) =>
                            setDataStep({
                                ...isDataStep,
                                category: val
                            })
                        }
                    />
                </Box>
                <Box>
                    <Select
                        label={"Sentiment"}
                        required
                        value={isDataStep.sentiment}
                        placeholder='Pilih Sentiment'
                        data={dSentiment.map((pro: any) => ({
                            value: String(pro.val),
                            label: pro.label
                        }))}
                        onChange={(val: any) =>
                            setDataStep({
                                ...isDataStep,
                                sentiment: val
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
            <ModalEditStep dataStep={isDataStep} textContent={editor?.getHTML()} />
        </Modal>
    </>
    )
}