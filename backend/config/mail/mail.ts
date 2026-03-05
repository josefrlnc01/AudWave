import transport from "./NODEMAILER.js"

interface IEmail {
    email: string
    token: string
    name: string
}

export class AuthEmail {
    static sendEmail = async (user : IEmail ) => {
        await transport.sendMail({
                from: 'Traductioner-- <admin@uptask.com>',
                to : user.email,
                subject : 'Traductioner-- Confirma tu cuenta',
                text : 'Traductioner-- Confirma tu cuenta',
                html : `<p>Hola ${user.name}, te has registrado correctamente en Traductioner, ya casi esta todo listo, solo debes confirmar tu cuenta.</p>
                <p>Visita el siguiente enlace:</p>
                <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
                <p>Ingresa el código: <b>${user.token}</b></p>
                <p>Este token expira en 10 minutos</p>
                `
            })
    }
}