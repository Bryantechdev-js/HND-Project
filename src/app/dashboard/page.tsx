import EmailCompositionForm from '@/components/EmailCompositionForm'
import ModernInbox from '@/components/ModernInbox'
import React from 'react'

function page() {
  return (
    <div className='w-full h-screen max-w-full min-h-screen dark:bg-[#121212] dark:text-white text-black  bg-slate-100 px-5 py-3'>
      
        {/* <EmailCompositionForm/> */}
        <ModernInbox/>
    </div>
  )
}

export default page
