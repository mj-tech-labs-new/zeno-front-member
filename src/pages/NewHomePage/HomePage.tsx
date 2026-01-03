import React from 'react'

import BrandingSection from './components/BrandingSection'
import HeroSection from './components/HeroSection'
import TradingContainer from './components/TradingContainer'
// import Navbar from "./components/Navbar"
import WhyUs from './components/WhyUs'
import ChooseUs from './sections/ChooseUs'
import JoinUs from './sections/JoinUs'
import Testimonals from './sections/Testimonals'
// import CardStacking from "./sections/CardStacking"
import WorkSection from './sections/WorkSection'

const HomePage = () => (
  <React.Fragment>
    {/* <Navbar /> */}
    <HeroSection />
    <BrandingSection />
    <WhyUs />
    <WorkSection />
    <ChooseUs />
    <TradingContainer />
    {/* <CardStacking /> */}
    <Testimonals />
    <JoinUs />
  </React.Fragment>
)

export default HomePage
