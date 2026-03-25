let suscription: string | null = null

export const suscriptionStore = {
    get: () => suscription,
    set: (sus:string) => {
        suscription = sus
    }
}