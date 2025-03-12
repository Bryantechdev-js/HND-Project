import React from 'react'

function PricingNav() {
  return (
    <div className='flex justify-between items-center py-4 px-20 shadow-md shadow-white dark:bg-[#121212] bg-white text-black dark:text-whit w-full h-16'>
      <div className="logo text-3xl text-black font-bold dark:text-white">MaxMail</div>
      <div className="NavElements flex justify-between items-center space-x-8">
        <nav className='flex justify-between items-center space-x-5'>
            <a href="/" className='dark:text-white text-black'>Home</a>
            <a href="/about" className='dark:text-white text-black'>About</a>
            <a href="/contact" className='dark:text-white text-black'>Contact</a>
        </nav>
        <div className="payments flex justify-between items-center space-x-5">

            <a href="/stripe" className='dark:text-white text-black'>Stripe</a>

        </div>
       </div>
    </div>
  )
}

export default PricingNav
