import { SidebarTrigger } from "./ui/sidebar";

export default function Header() {
  return (
    <header className='w-full text-center py-4'>
        <div className='w-full p-2 pl-4 pr-4 flex justify-start'>
          <SidebarTrigger className=' bg-slate-950' />
        </div>
    </header>
  )
}
