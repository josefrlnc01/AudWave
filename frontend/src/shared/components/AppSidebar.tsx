import LogOut from "@/features/auth/components/LogOut"
import { Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/shared/components/ui/sidebar"

export function AppSidebar() {
  return (
    <Sidebar >
      <SidebarContent className="bg-slate-950">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/dashboard">Inicio</a>
                
              </SidebarMenuButton>
              
            </SidebarMenuItem>
            <SidebarMenuItem>
                
                <LogOut/>
             
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}