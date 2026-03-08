import { tokenStore } from "@/lib/token.store"


const urlBackend = import.meta.env.VITE_API_URL
export async function sendLink(link:string, lang:string | null):Promise<{subtitles: string, translatedText:string, title:string, id: string} | undefined> {
    const accessToken = tokenStore.get()
    try {
        const response = await fetch(`${urlBackend}/link`, {
            method:'POST',
            body: JSON.stringify({videoLink: link, lang}),
            headers : {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${accessToken}`
            }
        })
        
        if (!response.ok) {
            if (response.status === 429){
                throw new Error('No puedes realizar más traducciones')
            }
            
            throw new Error(`Server error`)
        }
  
        const data = await response.json()
        if (!data) {
            throw new Error('Hubo un error en el proceso')
        }
        const {subtitles, translatedText, title, id} = data
            return {title, subtitles, translatedText, id}
    } catch (error) {
        throw error instanceof Error ? error : new Error('Hubo un error en el proceso')
    }
}



