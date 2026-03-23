import { useState } from "react"
import NewPasswordToken from "../components/NewPasswordToken"
import NewPasswordFormComponent from "../components/NewPasswordFormComponent"

export default function NewPasswordView() {
    const [token, setToken] = useState('')
    const [isValidToken, setIsValidToken] = useState(false)

    console.log('new password')
    return (
        <>
            <h1 className="text-5xl font-black text-white">Reestablecer  contraseña</h1>
            <p className="text-2xl font-light text-white mt-5">
                Ingresa el código que recibiste {''}
                <span className=" text-fuchsia-500 font-bold"> por email</span>
            </p>

            {!isValidToken ?
                <NewPasswordToken
                    token={token}
                    setToken={setToken}
                    setIsValidToken={setIsValidToken} />
                :
                <NewPasswordFormComponent
                    token={token}
                />}
        </>
    )
}