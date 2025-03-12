import AboutHero from '@/components/AboutHero'
import AboutNav from '@/components/AboutNav'
import CoreValuesSection from '@/components/CoreValuesSection'
import MissionSection from '@/components/MissoinSection'
import React from 'react'
import CompanyHistorySection from '../CompanyHistorySection'
import MaxMailUniqueSection from '@/components/MaxMailUniqueSection'
import AnimatedCTA from '@/components/AnimatedCTA'
import Footer from '@/components/Footer'

function page() {
  return (
    <div>
        <AboutNav/>
      <AboutHero/>
      <MissionSection/>
      <CoreValuesSection/>
      <CompanyHistorySection/>
      <MaxMailUniqueSection/>
      <AnimatedCTA/>
      <Footer/>
    </div>
  )
}

export default page
