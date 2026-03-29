import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { Navigate } from 'react-router'
import { Outlet } from 'react-router'
import { Spinner } from '@/components/ui/spinner'
import { useTheme } from '@/shared/context/ThemeContext'


export default function AppLayout({ children }: { children?: React.ReactNode }) {
    const { data, isError, isLoading } = useAuth()
    const {theme} = useTheme()
    if (isLoading) {
        return (
            <aside className="p-4 min-h-screen max-w-screen h-screen bg-[#101622] flex flex-col gap-3 items-center text-white justify-center">
                <Spinner
                    className="size-20"
                />
            </aside>
        )
    }

    if (isError) return <Navigate to={'/landing-page'} replace />

    if (data) {

        return (
            <>
                
                    
                    <main className={`min-w-screen max-w-screen overflow-x-hidden max-h-screen min-h-screen ${theme === 'dark' ? 'bg-[#101622] text-white' : 'bg-slate-300/40  text-slate-900'} `}>
                        
                        <Outlet />

                        {children}
                    </main>

                    <ToastContainer
                        pauseOnHover={false}
                        pauseOnFocusLoss={false}
                    />
                
            </>
        )
    }

    return null
}
