import { useQueryClient } from '@tanstack/react-query'
import { logOut } from '../api/authApi'

import { useNavigate } from 'react-router'

export default function LogOut() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const handleLogOut = async () => {
        await logOut()
        queryClient.invalidateQueries({queryKey: ['user']})
        navigate('/auth/login')
    }
    return (
        <div>
            <button className='text-white' onClick={handleLogOut}>Salir</button>
        </div>
    )
}
