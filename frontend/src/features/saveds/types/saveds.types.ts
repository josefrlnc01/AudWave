import type { User } from "@/features/transcription/types/user.types"

export type Saveds = {
  _id: string,
  fileId: string,
  title: string,
  segments: {
    start: number,
    end: number,
    text: string
  }[],
  duration: string,
  origin: string,
  user: string,
}[]

export type SavedFile = {
    duration: string
    fileId: string
    segments: {
        start: number,
        end: number,
        text: string
    }[],
    title: string
    user: string,
    origin: string,
    __v: number
    _id: string
}

export type SavedFileProps = {
    data: SavedFile
    user: User
    id: string
}


export type SavedsList = {
  files: Saveds,
  youtubeFiles: Saveds
}