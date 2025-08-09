"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarTrigger,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { BarChart3, CheckCircle2, Home, BadgeIcon as IdCard, Package, Users } from 'lucide-react'

export default function NgoSidebar() {
  const items = [
    { title: "Overview", href: "/ngo", icon: Home },
    { title: "Farms", href: "/ngo/farms", icon: IdCard },
    { title: "Verification", href: "/ngo/verification", icon: CheckCircle2 },
    { title: "Rewards", href: "/ngo/rewards", icon: Package },
    { title: "Reports", href: "/ngo/reports", icon: BarChart3 },
    { title: "Team", href: "/ngo/team", icon: Users },
  ]
  return (
    <Sidebar>
      <SidebarHeader className="px-2 py-2">
        <div className="flex items-center gap-2 px-2">
          <span className="font-semibold">IndieCrop</span>
          <span className="text-xs text-muted-foreground">NGO</span>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((it) => (
                <SidebarMenuItem key={it.href}>
                  <SidebarMenuButton asChild>
                    <Link href={it.href}>
                      <it.icon />
                      <span>{it.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-2">
        <SidebarTrigger />
      </SidebarFooter>
    </Sidebar>
  )
}
