
import Header from '@/features/transcription/components/Header'
import Logo from './Logo'
import Footer from '@/features/transcription/components/Footer'

export type SuccessDisplayProps = {
    sessionId: string
}
export default function SuccessDisplay({sessionId}: SuccessDisplayProps) {
    const urlBackend = import.meta.env.VITE_API_URL

    const handleCreatePortalSession = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const response = await fetch(`${urlBackend}/stripe/create-portal-session`, {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({session_id: sessionId})
        })

        const data = await response.json()

        if (!response.ok || !data?.url) {
            console.error('Error creando portal session', data)
            alert(data?.error ?? 'No se pudo abrir el portal de Stripe')
            return
        }

        window.location.href = data.url
    }

    return (
        <>
        <Header/>
        <section className='w-screen h-screen flex flex-col justify-center items-center'>
            <aside className='bg-slate-900 p-12 rounded-xl flex flex-col gap-4'>
                    <div className="product Box-root">
                <div className="description Box-root">
                    <h3 className='text-white font-bold'>¡Compra del plan de suscripción realizada correctamente!</h3>
                </div>
            </div>
            <form className='flex flex-col justify-center' action="/create-portal-session" method="POST">
                <input
                    type="hidden"
                    name="session_id"
                />
                <button className='text-white bg-slate-950 p-4 rounded-md font-semibold cursor-pointer mx-auto hover:bg-slate-950/80 transition-colors ease-in' onClick={handleCreatePortalSession} type="submit">
                    Administra tu suscripción
                </button>
            </form>
            </aside>
            
        </section>
        <Footer/>
        </>
        
    )
}
