'use client'

import { Box, Group, Text, rem } from "@mantine/core";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";

export default function UploadDataAudience(props: Partial<DropzoneProps>) {
    return (
        <>
            <Box
                style={{
                    border: "1px dashed gray",
                    borderRadius: 10,
                    padding: 30,
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

                        <div>
                            <Text size="xl" inline>
                                UPLOAD DATA
                            </Text>
                        </div>
                    </Group>
                </Dropzone>
            </Box>

        </>
    );
}