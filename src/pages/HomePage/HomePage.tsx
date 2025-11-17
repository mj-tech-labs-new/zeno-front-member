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

const HomePage = () => (
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

export default HomePage
