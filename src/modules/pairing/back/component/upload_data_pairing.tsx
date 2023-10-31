'use client'

import { Box, Center, Group, Text, rem } from "@mantine/core";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useAtom } from "jotai";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { isModalPairing } from "../val/modal_pairing";

export default function UploadDataPairing(props: Partial<DropzoneProps>) {
    const [openModal, setOpenModal] = useAtom(isModalPairing);
    return (
        <>
            <Box
                style={{
                    backgroundColor: "white",
                    padding: 27,
                    borderRadius: 10,
                }}
            >
                <Center>
                    <Box
                        style={{
                            border: "1px dashed gray",
                            borderRadius: 10,
                            padding: 50,
                        }}
                    >
                        <Dropzone
                            onDrop={(files) => console.log("accepted files", files)}
                            onReject={(files) => console.log("rejected files", files)}
                            maxSize={3 * 1024 ** 2}
                            accept={IMAGE_MIME_TYPE}
                            {...props}
                            style={{ cursor: "pointer" }}
                        >
                            <Group
                                justify="center"
                                gap="xl"
                                mih={50}
                                style={{ pointerEvents: "none" }}
                            >
                                <Dropzone.Accept>
                                    <AiOutlineCloudUpload
                                        style={{
                                            width: rem(30),
                                            height: rem(30),
                                            color: "var(--mantine-color-blue-6)",
                                        }}
                                        stroke={1.5}
                                    />
                                </Dropzone.Accept>
                                <Dropzone.Reject>
                                    <MdOutlineCancel
                                        style={{
                                            width: rem(30),
                                            height: rem(30),
                                            color: "var(--mantine-color-red-6)",
                                        }}
                                        stroke={1.5}
                                    />
                                </Dropzone.Reject>

                                <Box>
                                    <Text c={"gray"} size="xl" inline>
                                        UPLOAD DATA
                                    </Text>
                                </Box>
                            </Group>
                        </Dropzone>
                    </Box>
                </Center>
            </Box>
        </>
    );
}