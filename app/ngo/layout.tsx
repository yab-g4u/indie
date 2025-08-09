import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import NgoSidebar from "@/components/ngo/sidebar"

export default function NgoLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <NgoSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
