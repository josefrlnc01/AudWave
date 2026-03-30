import { tokenStore } from "@/lib/token.store"
import { isAxiosError } from "axios"
import { useState } from "react"

export const useSummary = () => {
    const [summary, setSummary] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const handleGenerateIaSummary = async (id: string) => {
        const urlBackend = import.meta.env.VITE_API_URL
        const accessToken = tokenStore.get()
        setIsLoading(true)
        setSummary('')
        try {
            const response = await fetch(`${urlBackend}/saveds/${id}/summary`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            )
            //Creación de reader de stream
            const reader = response.body!.getReader()
            //Creación decodificador 
            const decoder = new TextDecoder()

            while (true) {
                //Lectura de response
                const { done, value } = await reader.read()

                if (done) break
                //Decodificación del output de bd
                const chunk = decoder.decode(value)

                //Partición del output en líneas
                const lines = chunk.split('\n\n').filter(Boolean)

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        //Formateo de la linea, si empieza con data: hola mundo, coger solo hola mundo
                        const data = line.replace('data: ', '')

                        if (data === '[DONE]') return
                        const { text } = JSON.parse(data)
                        setSummary(prev => prev + text)
                    }
                }
                setIsLoading(false)
            }
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error)
            }
        }
    }


    return { summary, isLoading, handleGenerateIaSummary }
}