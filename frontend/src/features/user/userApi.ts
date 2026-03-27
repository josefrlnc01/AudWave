import { tokenStore } from "@/lib/token.store";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL
export async function deleteUser () {
    const accessToken = tokenStore.get()
    await axios.delete(`${baseUrl}/user/delete`, {
        headers: {
            "Authorization" : `Bearer ${accessToken}`
        },
        withCredentials: true
    })
}