import React from 'react'

import Footer from '../HomePage/components/Footer'
import BrandingSection from './components/BrandingSection'
import HeroSection from './components/HeroSection'
import TradingContainer from './components/TradingContainer'
// import Navbar from "./components/Navbar"
import WhyUs from './components/WhyUs'
import BottomFooter from './sections/BottomFooter'
import ChooseUs from './sections/ChooseUs'
import JoinUs from './sections/JoinUs'
import QA from './sections/QA'
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
    <QA />
    <Footer />
    <BottomFooter />
  </React.Fragment>
)

export default HomePage
