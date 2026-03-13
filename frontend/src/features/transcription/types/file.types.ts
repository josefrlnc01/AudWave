export type StoredFileTranscription = {
    title: string,
    comment: string | null
    fileText: string,
}

export type StoredFileTranslation = {
    title: string
    comment: string | null,
    translatedFile: string
}