export function formatMinutes(decimal: number): string {
        const mins = Math.floor(decimal)
        const secs = Math.floor((decimal % 1) * 60)
        return secs > 0 ? `${mins}m ${secs}s` : `${mins}min`
    }