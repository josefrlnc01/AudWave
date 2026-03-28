import { useContext, createContext } from "react";
import type { Theme } from "../stores/theme.store";

export type ThemeContextType = {
    theme: Theme,
    toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | null>(null)

export function useTheme() {
    const context = useContext(ThemeContext)

    if (!context) {
        throw new Error('useTheme debe usarse dentro de themecontext.provider')
    }

    return context
}