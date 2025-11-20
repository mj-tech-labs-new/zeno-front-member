import {useEffect} from 'react'
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
  const location = useLocation()
  const challengeId = location.state
  const navigate = useNavigate()

  useEffect(() => {
    if (!challengeId) navigate(-1)
  }, [challengeId, navigate])

  return (
    <div className="h-[calc(100%-86px)] w-full overflow-y-auto space-y-1">
      <Loader ref={(ref) => ref?.showLoader(isLoadingCandles)} />
      <ChartHeader />
      <div className="flex flex-col gap-1 flex-1 w-full ">
        <div className="grid grid-cols-1 2xl:grid-cols-2">
          <ChartRenderer />
          <div className="grid grid-cols-2">
            <Trades close={36641.2} />
            <PlaceOrder />
          </div>
        </div>
        <TradesInfo challengeId={challengeId} />
      </div>
    </div>
  )
}

export default ChartRenderingLayout
