"use client"

import ModernLoginForm from '@/components/DashboardAuthCompunent/login'
import { prisma } from '@/lib/db'
import { LogIn } from 'lucide-react'
// import { useRouter } from 'next/navigation'
// import { useRouter } from 'next/router'
import React from 'react'

async function page() {
 
  return (
    <div>
      <ModernLoginForm/>
    </div>
  )
}

export default page
