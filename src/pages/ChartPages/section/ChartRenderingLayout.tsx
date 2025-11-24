import {Loader} from '@/components'

import ChartRenderer from '../ChartRenderer'
import ChartHeader from '../components/ChartHeader'
import {useChartProvider} from '../context/ChartProvider'
import PlaceOrder from './PlaceOrder'
import Trades from './Trades'
import TradesInfo from './TradesInfo'

const ChartRenderingLayout = () => {
  const {isLoadingCandles, challengeId} = useChartProvider()

  return (
    <div className="h-[calc(100%-86px)] w-full overflow-y-auto space-y-1">
      <Loader ref={(ref) => ref?.showLoader(isLoadingCandles)} />
      <ChartHeader />
      <div className="flex flex-col gap-1 flex-1 w-full ">
        <div className="grid grid-cols-1 2xl:grid-cols-2">
          <ChartRenderer />
          <div className="grid grid-cols-2 h-[calc(100vh-246px)]">
            <Trades />
            <PlaceOrder />
          </div>
        </div>
        <TradesInfo challengeId={challengeId} />
      </div>
    </div>
  )
}

export default ChartRenderingLayout
