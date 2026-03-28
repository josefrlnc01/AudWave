import Quota from "../../modules/quota/quota.schema.js";
export const checkQuota = async (req, res, next) => {
    const user = req.user;
    //Obtención de la ip del dispositivo
    const ip = (req.headers['x-forwarded-for']?.toString().split(' ')[0] ||
        req.socket.remoteAddress ||
        'unknown').trim();
    try {
        const quota = await Quota.findOne({
            user: user._id, ip
        });
        if (quota && user.suscription === 'free' && quota.usedMinutes >= 6) {
            return res.status(429).json({ error: `No dispones de minutos de transcripción gratuita suficientes.` });
        }
        if (quota && user.suscription === 'pro' && quota.usedMinutes >= 180) {
            return res.status(429).json({ error: `No dispones de minutos de transcripción suficientes.` });
        }
        if (quota && user.suscription === 'business' && quota.usedMinutes >= 600) {
            return res.status(429).json({ error: `Ya has gastado todos los minutos de transcripción.` });
        }
        next();
    }
    catch {
        return res.status(500).json({ error: 'Error al verificar cuota' });
    }
};
