import AboutNav from '@/components/AboutNav'
import ContactForm from '@/components/ContactForm'
import Navbar from '@/components/Navbar'
import React from 'react'

function page() {
  return (
    <div className='w-full h-screen'>
        <AboutNav/>
      <ContactForm/>
    </div>
  )
}

export default page
