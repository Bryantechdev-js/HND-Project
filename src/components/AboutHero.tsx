import React from 'react'
import { Globe } from './ui/globe'

function AboutHero() {
  return (
    <div className='w-full h-screen flex justify-center items-center dark:bg-[#121212] dark:text-white px-20 py-20 relative'>
        <h1 className='absolute bottom-[80px] text-center px-20 dark:text-white'>Experience fast, reliable email delivery worldwide, ensuring your messages reach their destination instantly and securely, no matter where you are. Stay connected with seamless communication across the globe.</h1>
        <Globe/>
    </div>
  )
}

export default AboutHero
