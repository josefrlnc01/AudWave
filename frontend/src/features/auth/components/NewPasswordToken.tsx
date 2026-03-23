import { useMutation } from "@tanstack/react-query"
import type { TokenConfirmation } from "../types/auth.types"
import { toast } from "react-toastify"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/shared/components/ui/input-otp"
import { Link } from "react-router"
import { validateToken } from "../api/authApi"


type NewPasswordTokenProps = {
    token: TokenConfirmation['token'],
    setToken: React.Dispatch<React.SetStateAction<string>>
    setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NewPasswordToken({ token, setToken, setIsValidToken }: NewPasswordTokenProps) {

    const handleChange = (token: TokenConfirmation['token']) => {
        setToken(token)
    }

    const { mutate } = useMutation({
        mutationFn: validateToken,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            setIsValidToken(true)
        }
    })
    const handleComplete = (token: TokenConfirmation['token']) => mutate( token )

    return (
        <>
            <form
                className="space-y-8 p-10 rounded-lg mt-10"
            >
                <label
                    className="font-normal text-2xl text-center block"
                >Código de 6 dígitos</label>
                <div className="flex justify-center gap-5">
                    <InputOTP value={token} maxLength={6} onChange={handleChange} onComplete={handleComplete}>
                        <InputOTPGroup className="text-white font-bold">
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
            </form>
            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to='/auth/forgot-password'
                    className="text-center text-gray-300 font-normal"
                >
                    Solicitar un nuevo Código
                </Link>
            </nav>
        </>
    )
}