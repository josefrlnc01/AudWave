import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '@/hooks/useAuth'
import { Link, Navigate } from 'react-router'
import { Outlet } from 'react-router'

export default function AppLayout() {
    const { data, isError, isLoading } = useAuth()
   
    console.log(data)


    if (isLoading) return 'Cargando...'

    if (isError || !data) return <Navigate to={'/auth/login'} />


    if (data) {
        return (
            <>
                <aside className='max-w-screen-2xl'>
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
