import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { Link, Navigate } from 'react-router'
import { Outlet } from 'react-router'
import { Spinner } from '@/shared/components/ui/spinner'

export default function AppLayout() {
    const { data, isError, isLoading } = useAuth()

    if (isLoading) {
        return (
            <aside className=" p-4 bg-slate-950 flex flex-col gap-3 items-center text-white justify-center">
                <Spinner
                    className="size-20"
                />
            </aside>
        )
    }

    if (isError || !data) return <Navigate to={'/auth/login'} />


    if (data) {
        return (
            <>
                <aside className='max-w-screen min-w-screen'>
                    <Outlet />
                </aside>

                <ToastContainer
                    pauseOnHover={false}
                    pauseOnFocusLoss={false}
                />

            </>
        )
    }

    return null
}
