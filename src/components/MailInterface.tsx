import React from 'react'
import Image from 'next/image'
function MailInterface() {
  return (
    <div className='w-full bg-white dark:bg-[#121212] h-140 py-40 px-20 flex flex-col justify-evenly items-center bg-black'>
      <h3>Email interface</h3>
      <div className="interfaceContianer w-full h-1/2 flex justify-center items-center">
         <Image src={"/MaxmailDashboard.PNG"} width={1000} height={200} alt='mail interface' />
      </div>
    </div>
  )
}

export default MailInterface
