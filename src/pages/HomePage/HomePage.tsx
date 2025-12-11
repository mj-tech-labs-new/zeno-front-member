import dayjs from 'dayjs'
import {useEffect} from 'react'
import {useSelector} from 'react-redux'

import {CommonFunction} from '@/services'
import {StorageProps} from '@/types/CommonTypes'

import BrandingCarousel from './components/BrandingCarousel'
import BrandingComponent from './components/BrandingComponent'
import Features from './components/Features'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Questions from './components/Questions'
import StartChallengeTwentyMins from './components/StartChallengeTwentyMins'
import StartYourJourney from './components/StartYourJourney'
import StopWastingTime from './components/StopWastingTime'
import TradingRules from './components/TradingRules'

const HomePage = () => {
  const userData = useSelector((data: StorageProps) => data.userData?.user)

  useEffect(() => {
    const currentDate = dayjs()
    const loggedInDate = userData?.loggedIn as unknown as Date
    if (currentDate.diff(loggedInDate, 'days') >= 1) {
      CommonFunction.addSliceData('logout', {})
    }
  }, [userData?.loggedIn])

  return (
    <div className="bg-landing-page-bg-color text-black min-h-screen">
      <Navbar />
      <BrandingComponent />
      <Features />
      <StopWastingTime />
      <StartChallengeTwentyMins />
      <StartYourJourney />
      <TradingRules />
      <BrandingCarousel />
      <Questions />
      <Footer />
    </div>
  )
}

export default HomePage
