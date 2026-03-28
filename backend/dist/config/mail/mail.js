import transport from "./NODEMAILER.js";
export class AuthEmail {
    static sendEmail = async (user) => {
        await transport.sendMail({
            from: 'Audwave',
            to: user.email,
            subject: 'AudWave-- Confirma tu cuenta',
            text: 'AudWave-- Confirma tu cuenta',
            html: `<p>Hola ${user.name}, te has registrado correctamente en AudWave, ya casi esta todo listo, solo debes confirmar tu cuenta.</p>
                <p>Visita el siguiente enlace:</p>
                <a href="${process.env.FRONTEND_URL_DEV}/auth/confirm-account">Confirmar cuenta</a>
                <p>Ingresa el código: <b>${user.token}</b></p>
                <p>Este token expira en 10 minutos</p>
                `
        });
    };
    static sendPasswordResetToken = async (user) => {
        await transport.sendMail({
            from: 'AudWave',
            to: user.email,
            subject: 'AudWave-- Cambia tu contraseña',
            text: 'AudWave-- Confirma el numero',
            html: `<p>Hola ${user.name}, para cambiar tu contraseña primero verifica el token.</p>
                <p>Visita el siguiente enlace:</p>
                <a href="${process.env.FRONTEND_URL_DEV}/auth/new-password">Cambiar contraseña</a>
                <p>Ingresa el código: <b>${user.token}</b></p>
                <p>Este token expira en 10 minutos</p>
                `
        });
    };
}
