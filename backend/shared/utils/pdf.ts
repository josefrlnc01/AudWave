import pdf from 'html-pdf'

export async function generatePdf (text: string) {
    console.log('text', text)
    const contenido = `<aside>
        ${text}
        </aside>`

    if (!text) {
        throw new Error('No hay contenido con el que generar el pdf')
    }

    pdf.create(contenido).toFile('document.pdf', (err, res) => {
        if (err) throw err
        console.log(res)
    })
}