import ffmpeg from 'fluent-ffmpeg'
import path from 'node:path'

export async function convertVideoToAudio (audioPath: string) {
    const finalFilePath = 'audioConverted.mp3'
    ffmpeg(audioPath)
        .toFormat("mp3")
        .on('end', () => {
            console.log('conversión realizada')
        })
        .on('error', (err) => {
            console.error(err)
        })
        .saveToFile(finalFilePath)

    return finalFilePath
} 