'use client'

import { useAtom } from "jotai"
import _ from "lodash"
import { _valReadIdEffect } from "../val/val_jokowi_effect"

export default function WrapperEffect({ id, children }: { id: any, children: any }) {
    const [valRead, setRead] = useAtom(_valReadIdEffect)

    if (!valRead.includes(id)) {
        valRead.push(id)
    }

    return (children)
}