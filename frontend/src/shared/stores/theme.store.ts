export type Theme = 'dark' | 'light'

export const themeStore = {
    get: () => {
        const theme = localStorage.getItem('theme')
        return theme === 'dark' ? 'dark' : 'light'
    },
    set: (theme: Theme) => localStorage.setItem('theme', theme)
}