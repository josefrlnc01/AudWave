export type StoredFileTranscription = {
    title: string,
    comment: string | null
    fileText: WhisperSegment[],
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