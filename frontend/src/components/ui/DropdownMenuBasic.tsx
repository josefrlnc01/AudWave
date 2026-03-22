import { Button } from "@/shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMutation } from "@tanstack/react-query"
import { deleteSaved } from "@/features/transcription/api/savedsApi"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"

type DropdownProps = {
    id: string
}
export function DropdownMenuBasic({id}: DropdownProps) {
    const navigate = useNavigate()
    const deleteFN = useMutation({
        mutationFn: deleteSaved,
        onSuccess: (data) => {
            toast.success(data)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })


    const handleDelete = () => {
        deleteFN.mutate(id)
        navigate('/')
    }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Archivo</DropdownMenuLabel>
          <DropdownMenuItem className="cursor-pointer hover:bg-blue-600/80 hover:text-white transition-colors duration-100 ease-in">Editar</DropdownMenuItem>
          <DropdownMenuItem 
          onClick={handleDelete}
          className="cursor-pointer hover:bg-red-500 hover:text-white transition-colors duration-100 ease-in">Eliminar</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}