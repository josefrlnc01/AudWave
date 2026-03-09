export class FileController {
    static init = async (req, res) => {
        try {
            const file = req.file;
            if (!file) {
                return res.status(400).json({ error: 'No se recibio ningun archivo en el campo audio' });
            }
            return res.status(200).json({
                filename: file.originalname,
                mimetype: file.mimetype,
                size: file.size
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Hubo un error al enviar el archivo' });
        }
    };
}
