import axios, { isAxiosError } from "axios";
import type { TranslateTextProps, TranslateYoutubeTextProps } from "./types/translation.types";
const urlBackend = import.meta.env.VITE_API_URL


export async function translateText ({lang, fileText}: TranslateTextProps) {
    try {
        const {data} = await axios.post(`${urlBackend}/translation/${lang}`, {fileText})

        return data
    } catch (error) {
        console.error(error)
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errror)
        }
    }
}

export async function translateYoutubeText ({lang, youtubeVideoText}: TranslateYoutubeTextProps) {
    try {
        const {data} = await axios.post(`${urlBackend}/translation/${lang}/youtube`, {youtubeVideoText})

        return data
    } catch (error) {
        console.error(error)
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errror)
        }
    }
}