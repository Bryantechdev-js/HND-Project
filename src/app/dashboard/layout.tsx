import { Sheet } from "@/components/ui/sheet"

 
export default function Layout({ children }) {
  return (
    <>
      nav
      <main className="flex">
          <Sheet/>
        <div className="flex-1">

        {children}
        </div>
     </main>
    
    </>
  )
}