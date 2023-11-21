'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function funLogout() {

    cookies().delete('_tknRV')

    return {
        success: true,
        message: "success"
    }
}