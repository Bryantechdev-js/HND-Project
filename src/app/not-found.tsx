"use client"

import NotFoundPage from '@/components/NotFoundPage'
import { subscribe } from 'diagnostics_channel'
import React from 'react'

function notfound() {
  



   return (
    <div className='w-full h-screen flex justify-center items-center text-red-500 text-2xl text-wrap'>
        
        <NotFoundPage/>
       
    </div>
  )
 
}

export default notfound
