import CollapsibleSidebar from "@/components/CollapsibleSidebar"
import Header from "@/components/Header"
import { ModeToggle } from "@/components/ModeToggle"
import Sidebar from "@/components/Sidebar"

export default function Settings() {
  return (
    <div className="flex">
      <CollapsibleSidebar />
      <div className="flex flex-col w-full">
        <Header title="Settings" />
        <div className="p-10">
          <h3 className="mb-2">Light/Dark Theme:</h3>
          <ModeToggle />
        </div>
      </div>
      <Sidebar />
    </div>
  )
}