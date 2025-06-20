'use server'
import { cookies } from "next/headers"

/**
 * Login user
 * @returns array data success dan message
 */

export async function funLogout() {

    // menghapus cookies
    cookies().delete('_tknRV')

    return {
        success: true,
        message: "success"
    }
}