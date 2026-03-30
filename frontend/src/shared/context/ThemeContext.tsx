import { useContext, createContext } from "react";
import type { ThemeContextType } from "./types/context.types";

export const ThemeContext = createContext<ThemeContextType | null>(null)

export function useTheme() {
    const context = useContext(ThemeContext)

    if (!context) {
        throw new Error('useTheme debe usarse dentro de themecontext.provider')
    }

    return context
}