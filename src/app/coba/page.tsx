'use client'

import { useAtom } from "jotai"
import { _val_list } from "./_widget/list_val"
import { Button } from "@mantine/core"
import _ from "lodash"

export default function Page() {
    const list = useAtom(_val_list)


    return <>
        <div suppressHydrationWarning={false}>
            {JSON.stringify(list[0])}
            <Button onClick={() => {
                const a = _.clone(list[0])
                a.push("nama")

                list[1](a)
            }}>Tombol Isi</Button>
        </div>
    </>
}