import pdf from 'html-pdf'
import fs from 'node:fs/promises'
import { AppError } from '../../modules/errors/AppError.js'

export async function generatePdf (text: string) {
    console.log('text', text)
    const contenido = `<aside>
        ${text}
        </aside>`

    if (!text) {
        throw new AppError('No hay contenido con el que generar el pdf', 400)
    }

    return new Promise ((resolve, reject) => {
        pdf.create(contenido).toFile('document.pdf', (err, res) => {
        if (err) return reject(err)
        const buffer = fs.readFile(res.filename)
        resolve(buffer)
    })
    })
}