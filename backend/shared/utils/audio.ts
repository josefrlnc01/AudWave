import { parseFile } from 'music-metadata'

export async function getAudioDuration (filePath: string)  {
    const metadata = await parseFile(filePath)
    return metadata.format.duration ?? 0
}