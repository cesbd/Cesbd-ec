import { AlignJustify, Calendar, Gem, GraduationCap, Home, Inbox, Search, Settings, StickyNote,  } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useRef, useState } from "react"
import { Button } from "./button";

// Menu items.
const items = [
  {
    title: "Inicio",
    url: "/",
    icon: Home,
  },
  // {
  //   title: "Marcas",
  //   url: "/marcas",
  //   icon: StickyNote,
  // },
  {
    title: "Eventos",
    url: "/eventos",
    icon: Calendar,
  },
  {
    title: "Promociones",
    url: "/promociones",
    icon: Gem,
  },
  {
    title: "Capacitaciones",
    url: "/capacitaciones",
    icon: GraduationCap,
  },
]

export function DrawerNav() {
  const triggerRef = useRef<HTMLButtonElement>(null);
  // const [toggle, settoggle] = useState(second)

  return (
    <SidebarProvider>
      <div className="absolute top-[120px] right-0 left-0 flex mx-auto justify-center">
        <AlignJustify className="text-amber-400 h-8 w-8" onClick={() => triggerRef.current!.click()} />
      </div>

      <SidebarTrigger ref={triggerRef} className="h-0 w-0 overflow-hidden" />
      <Sidebar collapsible="offcanvas" className="z-50">
        <SidebarContent className="bg-amber-200">
          <SidebarGroup>
            {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
            <SidebarGroupContent className="mt-4">
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title} className="text-center flex flex-col items-center justify-center ml-2 border-b-[1px] border-gray-700 mt-4">
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span className="text-xl font-medium">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
