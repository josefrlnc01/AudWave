import LogOut from "@/features/auth/components/LogOut";

export default function Header() {
  return (
    <header className='text-center py-4'>
        <div className='w-full p-6 flex justify-between'>
            <div>
                <p className='font-bold text-md text-white text-shadow-white'>Traductioner</p>
            </div>
            <LogOut/>
        </div>
    </header>
  )
}
