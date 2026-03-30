import type { Theme } from "@/shared/stores/theme.store"

export type ThemeContextType = {
    theme: Theme,
    toggleTheme: () => void
}