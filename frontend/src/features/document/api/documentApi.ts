import { tokenStore } from "@/lib/token.store";
import axios, { isAxiosError } from "axios";
const baseUrl = import.meta.env.VITE_API_URL
export async function generatePDF (text: string) {
    const accessToken = tokenStore.get()
    try {
        const {data} = await axios.post(`${baseUrl}/document/create`, {text}, {
            headers: {
                'Authorization' : `Bearer ${accessToken}`
            }
        })

        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}