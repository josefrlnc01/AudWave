import { youtubeVideoSchema } from '../../modules/youtube-video/youtube-video.schema.js';
export const validateProcessVideo = (req, res, next) => {
    const result = youtubeVideoSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ error: result.error.message });
    }
    req.body = result.data;
    return next();
};
