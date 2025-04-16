import React from 'react'
import AboutTopSection from '../components/AboutTopSection'
import AboutStatsSection from '../components/AboutStatsSection'
import AboutVideoSection from '../components/AboutVideoSection'
import MeetTeamSection from '../components/MeetTeamSection'
import AboutCompaniesSection from '../components/AboutCompaniesSection'

export default function AboutPage() {
  return (
    <div>
      <AboutTopSection />
      <AboutStatsSection />
      <AboutVideoSection />
      <MeetTeamSection />
      <AboutCompaniesSection/>
    </div>
  )
}
