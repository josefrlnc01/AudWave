import { Outlet } from "react-router"
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function AuthLayout() {
    return (
        <>
            <main className='bg-gray-800 min-h-screen min-w-screen flex flex-col justify-start items-center lg:block overflow-x-hidden'>
                    <Outlet />
            </main>
        <ToastContainer
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        />
        </>
    )
}
