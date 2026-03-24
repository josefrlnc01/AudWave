import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type { NewPasswordForm, TokenConfirmation } from "../types/auth.types";
import { toast } from "react-toastify";
import { updatePasswordWithToken } from "../api/authApi";

type NewPasswordFormComponentProps = {
    token : TokenConfirmation['token']
}
export default function NewPasswordFormComponent({token} : NewPasswordFormComponentProps) {
    const navigate = useNavigate()
    const initialValues: NewPasswordForm = {
        password: '',
        password_confirmation: '',
    }
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const {mutate} = useMutation({
        mutationFn : updatePasswordWithToken,
        onError : (error) => {
            toast.error(error.message)
        },
        onSuccess : (data) => {
            toast.success(data)
            reset()
            navigate('/auth/login')
        }
    })
    const handleNewPassword = (formData: NewPasswordForm) => {
        const data = {
            formData,
            token
        }
        mutate(data)
    }

    const password = watch('password');

    return (
        <>
        <aside className="max-w-xl mx-auto px-6 py-20">
            <form
                onSubmit={handleSubmit(handleNewPassword)}
                className="space-y-6 w-full mx-auto p-8 mt-10
                    bg-slate-900/60
                    border border-slate-700
                    rounded-2xl
                    backdrop-blur
                    shadow-xl"
                noValidate
            >

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-xl text-white"
                    >Contraseña</label>

                    <input
                        type="password"
                        className="w-full px-4 py-3
                            rounded-xl
                            bg-slate-900/60
                            border border-slate-700
                            text-white
                            placeholder-slate-400
                            focus:outline-none
                            focus:ring-2
                            transition"
                        {...register("password", {
                            required: "El Password es obligatorio",
                            minLength: {
                                value: 8,
                                message: 'El Password debe ser mínimo de 8 caracteres'
                            }
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-xl text-white"
                    >Repetir contraseña</label>

                    <input
                        id="password_confirmation"
                        type="password"
                        className="w-full px-4 py-3
                            rounded-xl
                            bg-slate-900/60
                            border border-slate-700
                            text-white
                            placeholder-slate-400
                            focus:outline-none
                            focus:ring-2
                            transition"
                        {...register("password_confirmation", {
                            required: "Repetir Password es obligatorio",
                            validate: value => value === password || 'Los Passwords no son iguales'
                        })}
                    />

                    {errors.password_confirmation && (
                        <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Actualizar contraseña'
                    className="w-full py-3
                        rounded-xl
                        font-semibold
                        text-white
                        bg-gradient-to-r
                        from-blue-500 
                        to-indigo-500
                        hover:from-blue-600
                        hover:to-indigo-500
                        transition
                        cursor-pointer"
                />
            </form>
            </aside>
        </>
    )
}