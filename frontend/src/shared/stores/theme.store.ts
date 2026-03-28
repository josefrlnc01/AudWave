export type Theme = 'dark' | 'light'

export const themeStore = {
    get: () => {
        const theme = localStorage.getItem('theme')
        return theme === 'dark' ? 'dark' : 'light'
    },
    set: (theme: string) => localStorage.setItem('theme', theme)
}