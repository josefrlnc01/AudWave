import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { Link, Navigate } from 'react-router'
import { Outlet } from 'react-router'
import { Spinner } from '@/shared/components/ui/spinner'
import { SidebarProvider, SidebarTrigger } from '@/shared/components/ui/sidebar'
import { AppSidebar } from '@/shared/components/AppSidebar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { data, isError, isLoading } = useAuth()
    const isAuth = localStorage.getItem('isAuth')
    if (isLoading) {
        return (
            <aside className="p-4 min-h-screen max-w-screen h-screen bg-slate-950 flex flex-col gap-3 items-center text-white justify-center">
                <Spinner
                    className="size-20"
                />
            </aside>
        )
    }

    if (!isAuth && isError) return <Navigate to={'/auth/login'} />


    if (data) {
        return (
            <>
            <SidebarProvider
            defaultOpen={false}>
                <AppSidebar/>
                <main className='max-w-screen min-w-screen max-h-screen min-h-screen bg-slate-950 text-white'>
                    <SidebarTrigger className='p-8 text-xl bg-slate-950'/>
                    <Outlet />
                    
                    {children}
                </main>

                <ToastContainer
                    pauseOnHover={false}
                    pauseOnFocusLoss={false}
                />
    </SidebarProvider>
            </>
        )
    }

    return null
}
