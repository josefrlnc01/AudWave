let minutes: number | null = null

export const minutesStore = {
    get: () => {
        return minutes
    },
    set: (mins: number) => {
        minutes = mins
    }
}

