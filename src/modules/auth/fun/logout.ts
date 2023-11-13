'use server'

import { cookies } from "next/headers"

export async function funLogout() {

    cookies().delete('_tknRV')

    return {
        success: true,
        message: "success"
    }
}