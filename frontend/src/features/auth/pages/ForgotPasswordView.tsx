import ErrorMessage from '@/shared/components/ErrorMessage';
import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import type { ForgotPasswordForm } from '../types/auth.types';
import { forgotPassword } from '../api/authApi';

export default function ForgotPasswordView() {
    const initialValues: ForgotPasswordForm = {
        email: ''
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: forgotPassword,
        onError: (error) => {
            console.error(error)
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
        }
    })

    const handleForgotPassword = (formData: ForgotPasswordForm) => mutate(formData)


    return (
        <>
            <aside className='max-w-xl mx-auto px-6'>
                <h1 className="text-4xl md:text-5xl font-bold text-white text-center">Reestablece tu contraseña</h1>
                <p className="text-lg text-slate-400 mt-4 text-center">
                    ¿Olvidaste tu contraseña? Introduce tu email y{" "}
                    <span className="text-blue-600/90 font-semibold">
                        te enviaremos instrucciones
                    </span>
                </p>
                <form
                    onSubmit={handleSubmit(handleForgotPassword)}
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
                            className="font-normal text-2xl text-white"
                            htmlFor="email"
                        >Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email de Registro"
                            className="w-full px-4 py-3
                            rounded-xl
                            bg-slate-900/60
                            border border-slate-700
                            text-white
                            placeholder-slate-400
                            focus:outline-none
                            focus:ring-2
                            focus:ring-fuchsia-500
                            focus:border-fuchsia-500
                            transition"
                            {...register("email", {
                                required: "El Email de registro es obligatorio",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "E-mail no válido",
                                },
                            })}
                        />
                        {errors.email && (
                            <ErrorMessage>{errors.email.message}</ErrorMessage>
                        )}
                    </div>

                    <input
                        type="submit"
                        value='Enviar Instrucciones'
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

                <nav className="mt-10 flex flex-col space-y-4">
                    <Link
                        to='/auth/login'
                        className="text-center text-gray-300 font-normal"
                    >
                        ¿Ya tienes cuenta? Iniciar Sesión
                    </Link>

                    <Link
                        to='/auth/register'
                        className="text-center text-gray-300 font-normal"
                    >
                        ¿No tienes cuenta? Crea una
                    </Link>
                </nav>
            </aside>
        </>
    )
}
