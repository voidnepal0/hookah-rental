import React from 'react'
import AboutUs from './AboutClient'
import Experience from '../../components/about/Experience'
import WhoAreWe from '../../components/about/WhoAreWe'
import TeamQuote from '../../components/about/TeamQuote'

const page = () => {
  return (
    <main>
      <AboutUs />
      <Experience />
      <WhoAreWe />
      <TeamQuote />
    </main>
  )
}

export default page