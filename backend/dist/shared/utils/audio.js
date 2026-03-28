import { parseFile } from 'music-metadata';
export async function getAudioDuration(filePath) {
    const metadata = await parseFile(filePath);
    const minutes = await convertToMinutes(metadata.format.duration ?? 0);
    return Number(minutes);
}
async function convertToMinutes(duration) {
    return (duration / 60).toFixed(2);
}
export function formatMinutes(decimal) {
    const mins = Math.floor(decimal);
    const secs = Math.floor((decimal % 1) * 60);
    return secs > 0 ? `${mins}m ${secs}s` : `${mins}min`;
}
