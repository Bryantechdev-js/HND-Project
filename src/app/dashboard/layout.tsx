// import {Sidebar} from "@/components/Sidebar"

import Sidebar from "@/components/Sidebar";


 
export default function Layout({ children }) {
  return (
    
      <main className="">
      {/* <div className="w-full h-[50px] px-20 py-5 text-black">nav</div> */}
        <div className="flex">

            <Sidebar/>
            <div className="flex-1 ">
                {children}
            </div>

        </div>
     </main>
    
  )
}