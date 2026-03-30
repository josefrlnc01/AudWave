import { AppError } from "../errors/AppError.js"
import PDFDocument from 'pdfkit'
import { formatSRTTime, formatTime, formatVTTTime } from "../../shared/utils/time.js"
import { Document, Packer, Paragraph, TextRun } from "docx"
import {stringify} from 'csv-stringify/sync'
import fsSync from 'node:fs'


export class DocumentService {
    static generatePdf = async (segments:{start: number, end:number, text: string}[]) => {
        const text = segments.map(s => `${formatTime(s.start)}:${formatTime(s.end)} ${s.text}`)
        if (!segments?.length) {
            throw new AppError('No hay contenido con el que generar el pdf', 400)
        }

        return await new Promise<Buffer>((resolve, reject) => {
            const doc = new PDFDocument({
                margin: 50,
                size: 'A4'
            })

            const chunks: Buffer[] = []

            doc.on('data', (chunk: Buffer) => {
                chunks.push(chunk)
            })

            doc.on('end', () => {
                resolve(Buffer.concat(chunks))
            })

            doc.on('error', (error) => {
                reject(error)
            })

            doc.fontSize(18).text("Transcripción", {underline: true})
            doc.moveDown()

            for (const segment of segments) {
                doc
                    .fontSize(10)
                    .fillColor('blue')
                    .text(`${formatTime(segment.start)}:${formatTime(segment.end)}`)

                doc
                    .fontSize(12)
                    .fillColor('black')
                    .text(segment.text)

                doc.moveDown()
            }

            doc.end()
        })
    }


    static generateSrt = async (segments: { start: number, end: number, text: string }[]) => {
        return segments.map((segment, i) => {
            const start = formatSRTTime(Number(segment.start.toFixed(2)))
            const end = formatSRTTime(Number(segment.end.toFixed(2)))
            return `${i + 1}\n${start} --> ${end}\n${segment.text.trim()}`
        }).join('\n\n')
    }


    static generateVtt = async (segments: { start: number, end: number, text: string }[]) => {
        const body = segments.map(s => `
            ${formatVTTTime(Number(s.start.toFixed(2)))} --> ${formatVTTTime(Number(s.end.toFixed(2)))}
            ${s.text}
            `.trim()).join('\n\n')

        return `WEBVTT\n\n${body}`
    }


    static generateTxt = async (segments: { start: number, end: number, text: string }[]) => {
        return segments.map((segment) => {
            const start = formatTime(Number(segment.start.toFixed(2)))
            const end = formatTime(Number(segment.end.toFixed(2)))
            return `${start}:${end} ${segment.text}`
        }).join('\n')
    }


    static generateDocX = async (segments:{start:number, end: number, text:string}[]) => {
        const paragraphs = segments.map(seg => 
            new Paragraph({
                spacing: {after: 200},
                children: [
                    new TextRun({
                        text: `${formatTime((Number(seg.start.toFixed(2))))} `,
                        color: '666666',
                        font: 'Courier New'
                    }),
                    new TextRun({
                        text: seg.text,
                        bold: true,
                        size: 24
                    })
                ]

            })
        )

        const doc = new Document({
            sections: [
                {children: paragraphs}
            ]
        })

        const buffer = await Packer.toBuffer(doc)


        return buffer
    }


    static generateJson = async (segments:{start: number, end: number, text: string}[]) => {
        const document = segments.map(s => {
            const start = Number(s.start.toFixed(2))
            const end = Number(s.end.toFixed(2))
            return {
                start,
                end,
                text: s.text
            }
        })

        const jsonDocument = JSON.stringify(document, null, 2)
        return jsonDocument
    }


    static generateCsv = async (segments:{start: number, end: number, text: string }[]) => {
        const rows = segments.map(s => [formatTime(Number(s.start.toFixed(2))), formatTime(Number(s.end.toFixed(2))), s.text ])
        const data = stringify([
            ["start", "end", "text"],
            ...rows
        ])
        fsSync.writeFileSync('transcription.csv', data)
        return data
    }
}