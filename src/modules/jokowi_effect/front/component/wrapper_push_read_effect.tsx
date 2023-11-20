'use client'

import { useAtom } from "jotai"
import _ from "lodash"
import { _valReadIdEffect } from "../val/val_jokowi_effect"
import parse from "html-react-parser"
import { Box } from "@mantine/core"

export default function WrapperEffect({ id, children }: { id: any, children: any }) {
    const [valRead, setRead] = useAtom(_valReadIdEffect)

    if (!valRead.includes(id)) {
        valRead.push(id)
    }

    return (children)
}