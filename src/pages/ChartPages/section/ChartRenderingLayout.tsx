import {useEffect} from 'react'
import {useLocation} from 'react-router-dom'

import {Loader} from '@/components'
import {getChallengeByIdApi} from '@/pages/ChallengeDashboard/api/ChallengeDashboardApi'

import ChartRenderer from '../ChartRenderer'
import ChartHeader from '../components/ChartHeader'
import {useChartProvider} from '../context/ChartProvider'
import PlaceOrder from './PlaceOrder'
import Trades from './Trades'
import TradesInfo from './TradesInfo'

const ChartRenderingLayout = () => {
  const {
    isLoadingCandles,
    challengeId,
    setChallengeId,
    setGetChallengeByIdArray,
  } = useChartProvider()
  const location = useLocation()

  useEffect(() => {
    setChallengeId(location.state?.challengeId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state?.challengeId])

  useEffect(() => {
    if (!challengeId) return
    getChallengeByIdApi({challenge_id: challengeId}).then((res) => {
      setGetChallengeByIdArray(res)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challengeId])

  return (
    <div className="h-[calc(100%-86px)] w-full overflow-y-auto space-y-1 ">
      <Loader ref={(ref) => ref?.showLoader(isLoadingCandles)} />
      <ChartHeader />
      <div className="flex flex-col gap-1 flex-1 w-full ">
        <div className="flex flex-col lg:flex-row">
          <ChartRenderer />
          <div className="grid grid-cols-2 lg:flex h-[calc(100vh-246px)] ">
            <Trades />
            <PlaceOrder />
          </div>
        </div>
        {challengeId && <TradesInfo challengeId={challengeId} />}
      </div>
    </div>
  )
}

export default ChartRenderingLayout
