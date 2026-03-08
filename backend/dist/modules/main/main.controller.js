import fs from 'node:fs/promises';
import getVideoId from 'get-video-id';
import { translateText } from "../translation/translation.service.js";
import { VideoService } from "../video/video.service.js";
export async function init(req, res) {
    const { videoLink, lang } = req.body;
    await fs.writeFile('link.json', JSON.stringify({ key: videoLink }));
    const dataOfId = getVideoId(videoLink);
    const id = dataOfId.id;
    if (!id || typeof id === 'undefined' || typeof id !== 'string') {
        const error = new Error('No se pudo procesar el id correctamente');
        return res.status(400).json({ error: error.message });
    }
    const isValid = await VideoService.isValidLength(id);
    if (!isValid) {
        const message = "El vídeo es muy largo";
        return res.status(403).json(message);
    }
    try {
        const data = await VideoService.getSubtitlesFromVideo(id);
        if (!data) {
            const error = new Error('No se pudo obtener la transcripción del vídeo');
            return res.status(400).json({ error: error.message });
        }
        const { subtitles, title } = data;
        const translatedText = await translateText(lang, subtitles);
        return res.json({ title, translatedText, id });
    }
    catch (err) {
        console.error('Error processing video:', err);
        return res.status(500).json({ error: 'Failed to process video' });
    }
}
