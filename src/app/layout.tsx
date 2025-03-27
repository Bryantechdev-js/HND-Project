import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <ClerkProvider>
    <html lang="en">
      <head>
    
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
           {children}
          </ThemeProvider>
          
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

<Script
        strategy="afterInteractive" // Load after the page is interactive
        id="chatbase-script"
        dangerouslySetInnerHTML={{
          __html: `
            (function(){
              if(!window.chatbase || window.chatbase("getState") !== "initialized"){
                window.chatbase = (...arguments) => {
                  if (!window.chatbase.q) {
                    window.chatbase.q = [];
                  }
                  window.chatbase.q.push(arguments);
                };
                window.chatbase = new Proxy(window.chatbase, {
                  get(target, prop) {
                    if (prop === "q") {
                      return target.q;
                    }
                    return (...args) => target(prop, ...args);
                  }
                });
              }

              const onLoad = function(){
                const script = document.createElement("script");
                script.src = "https://www.chatbase.co/embed.min.js";
                script.id = "OYZnAHnzOMQyNo3QPnXxm";
                script.domain = "www.chatbase.co";
                document.body.appendChild(script);
              };

              if (document.readyState === "complete") {
                onLoad();
              } else {
                window.addEventListener("load", onLoad);
              }
            })();
          `,
        }}
      />
      </body>
    </html>
   </ClerkProvider> 
  );
}
