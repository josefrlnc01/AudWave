import multer from "multer"
import fs from 'node:fs'
import path from "node:path"
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdirSync('uploads', { recursive: true })
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

export const upload = multer({storage})
