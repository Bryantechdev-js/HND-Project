// import {Sidebar} from "@/components/Sidebar"

import Sidebar from "@/components/Sidebar";
import Script from "next/script";


 
export default function Layout({ children}) {
  return (
    
      <body className="">
      {/* <div className="w-full h-[50px] px-20 py-5 text-black">nav</div> */}
        <div className="flex">

            <Sidebar/>
            <div className="flex-1 ">
                {children}
            </div>

        </div>
        <Script
        strategy="afterInteractive" // Load after the page is interactive
        id="google-translate-script"
        dangerouslySetInnerHTML={{
          __html: `
            function googleTranslateElementInit() {
              new google.translate.TranslateElement(
                {pageLanguage: 'en'},
                'google_translate_element'
              );
            }
          `,
        }}
      />

      <Script
        strategy="afterInteractive" // Load after the page is interactive
        id="google-translate-element"
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      />
     </body>
    
  )
}