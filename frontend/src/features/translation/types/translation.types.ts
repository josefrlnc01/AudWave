export type TranslateTextProps = {
    lang: string,
    fileText: {
        start:number,
        end:number,
        text:string
    }[]
}

export type TranslateYoutubeTextProps = {
    lang: string,
    youtubeVideoText: {
        start:number,
        end:number,
        text:string
    }[]
}