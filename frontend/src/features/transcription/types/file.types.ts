import type { SavedFile } from "@/features/saveds/types/saveds.types"

export type StoredFileTranscription = {
    title: string,
    comment: string | null
    fileText: SavedFile,
}

export type StoredFileTranslation = {
    title: string
    comment: string | null,
    translatedFile: string
}

export type WhisperSegment = {
  end:number,
    start:number,
    text:string
}