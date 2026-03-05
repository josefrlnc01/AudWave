import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logOut } from '../api/authApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

export default function LogOut() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { mutate } = useMutation({
        mutationFn: logOut,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            navigate('/auth/login')
        }
    })

    const handleLogOut = () => {
        queryClient.invalidateQueries({queryKey: ['user']})
        mutate()
    }
    return (
        <div className='p-2'>
            <button className='text-white' onClick={handleLogOut}>Salir</button>
        </div>
    )
}
