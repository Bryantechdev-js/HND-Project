import PricingNav from '@/components/PricingNav'
import PricingPlans from '@/components/PricingPlans'
import React from 'react'

function page() {
  return (
    <div className='max-w-full w-full h-screen max-h-screen'>
      <PricingNav/>
      <PricingPlans/>
    </div>
  )
}

export default page
