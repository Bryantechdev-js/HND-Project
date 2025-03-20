import { subscribe } from 'diagnostics_channel'
import React from 'react'

function notfound() {
    const arr=[
        "hello thier client",
        "this page does not exsite yet",
        "please be patient",
        "keep enjoying our services and subscribe for more",
    ]

    let text = arr.map((ell)=> " " + ell)



   return (
    <div className='w-full h-screen flex justify-center items-center text-red-500 text-2xl text-wrap'>
        
        { text}
       
    </div>
  )
 
}

export default notfound
