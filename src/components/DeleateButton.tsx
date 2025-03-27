"use client"

import { deleateEmails } from '@/action/action'
import { Trash } from 'lucide-react'
import React from 'react'

function DeleateButton(index) {
  return (
    <div>
      <span onClick={async ()=> await deleateEmails(index)} className='cursor-pointer'>
        <Trash className='w-auto h-auto'/>
      </span>
    </div>
  )
}

export default DeleateButton
