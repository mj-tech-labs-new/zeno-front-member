import {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

import {Loader} from '@/components'

import ChartRenderer from '../ChartRenderer'
import ChartHeader from '../components/ChartHeader'
import {useChartProvider} from '../context/ChartProvider'
import PlaceOrder from './PlaceOrder'
import Trades from './Trades'
import TradesInfo from './TradesInfo'

const ChartRenderingLayout = () => {
  const {isLoadingCandles} = useChartProvider()
  const [screenSize, setScreenSize] = useState(window.innerWidth)
  const location = useLocation()
  const challengeId = location.state
  const navigate = useNavigate()

  useEffect(() => {
    const handleScreenSize = () => {
      setScreenSize(window.innerWidth)
    }

    window.addEventListener('resize', handleScreenSize)

    return () => {
      window.removeEventListener('resize', handleScreenSize)
    }
  }, [])

  useEffect(() => {
    if (!challengeId) navigate(-1)
  }, [challengeId, navigate])

  return (
    <div className="h-[calc(100%-86px)] w-full overflow-y-auto space-y-1">
      <Loader ref={(ref) => ref?.showLoader(isLoadingCandles)} />
      <ChartHeader />
      <div className="flex">
        <div className="flex flex-col gap-1 flex-1 w-full ">
          <div className="flex gap-1 w-full">
            <ChartRenderer />
            {screenSize >= 1280 && <Trades close={36641.2} />}
          </div>
          {screenSize < 1280 && <Trades close={36641.2} />}
          <TradesInfo challengeId={challengeId} />
        </div>
        <PlaceOrder />
      </div>
    </div>
  )
}

export default ChartRenderingLayout
