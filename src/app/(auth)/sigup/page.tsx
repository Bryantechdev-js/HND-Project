import AdvancedLoginForm from '@/components/DashboardAuthCompunent/sigup'
import React from 'react'
import { ToastContainer } from 'react-toastify'

function page() {
  return (
    <div>
      <AdvancedLoginForm/>
      <ToastContainer />
    </div>
  )
}

export default page
