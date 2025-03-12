import React from 'react'
import Link from 'next/link'
import { ModeToggle } from './ModeToggle'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'


function Navbar() {
  return (
    <div className="max-w-full dark:bg-[#121212] dark:text-white z-100 flex justify-between items-center px-20 shadow py-5">
        <div className="text-black text-2xl font-bold dark:text-white">
          <Link href="/">MaxMail</Link>
        </div>
        <div className="hidden md:flex space-x-7">
          <Link href="/" className="text-black cursor-pointer  hover:text-gray-300 dark:text-white flex justify-center items-center" ><img width="24" height="24" className='mr-2' src="https://img.icons8.com/ios/24/home--v1.png" alt="home--v1"/>Home</Link>
          <Link href="/about" className="text-black cursor-pointer hover:text-gray-300 dark:text-white flex justify-center items-center" ><img width="24" height="24" src="https://img.icons8.com/ios/24/about-me.png" className='mr-2' alt="about-me"/>About</Link>
          <Link href="/contact" className="  cursor-pointer text-black hover:text-gray-300 dark:text-white flex justify-center items-center" ><img width="24" height="24" src="https://img.icons8.com/material-outlined/24/add-contact-to-company.png" alt="add-contact-to-company" className='mr-2'/>Contact</Link>

          <DropdownMenu/>
        </div>
        <>
        <div className="translation">
        <div id="google_translate_element" className="google-translate-container"></div>
        </div>
        <div className="lightDarck flex space-x-10 justify-center items-center">
            <ModeToggle/>

            <SignedOut>
              <SignInButton/>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
        </div>

        <div className="md:hidden">
          <button className="text-black dark:text-white">Menu</button>
        </div>
        </>
    </div>
  )
}

export default Navbar
