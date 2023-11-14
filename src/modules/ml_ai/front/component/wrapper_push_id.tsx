'use client'

import { useAtom } from "jotai"
import { _valReadIdMlai } from "../val/val_mlai"
import _ from "lodash"

export default function Wrapper({ id, children }: { id: any, children: any }) {
    const [valRead, setRead] = useAtom(_valReadIdMlai)

    if (!valRead.includes(id)) {
        valRead.push(id)
    }

    return (children)
}