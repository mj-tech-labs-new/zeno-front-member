import {useEffect} from 'react'
import {useParams} from 'react-router-dom'

import {Loader} from '@/components'
import {getChallengeByIdApi} from '@/pages/ChallengeDashboard/api/ChallengeDashboardApi'

import ChartRenderer from '../ChartRenderer'
import ChartHeader from '../components/ChartHeader'
import {useChartProvider} from '../context/ChartProvider'
import PlaceOrder from './PlaceOrder'
import Trades from './Trades'
import TradesInfo from './TradesInfo'

const ChartRenderingLayout = () => {
  const {isLoadingCandles, setChallengeId, setGetChallengeByIdArray} =
    useChartProvider()
  const params = useParams()
  useEffect(() => {
    if (!params?.challengeId) {
      return
    }
    setChallengeId(params.challengeId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.challengeId])

  useEffect(() => {
    if (!params?.challengeId) return
    getChallengeByIdApi({challenge_id: params?.challengeId}).then((res) => {
      setGetChallengeByIdArray(res)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.challengeId])

  return (
    <div
      className="h-[calc(100%-86px)] w-full overflow-y-auto space-y-1 "
      id="chartRendering"
    >
      <Loader ref={(ref) => ref?.showLoader(isLoadingCandles)} />
      <ChartHeader />
      <div className="flex flex-col gap-1 flex-1 w-full ">
        <div className="flex flex-col lg:flex-row">
          <ChartRenderer />
          <div className="grid grid-cols-2 lg:flex h-[600px] ">
            <Trades />
            <PlaceOrder />
          </div>
        </div>
        {params?.challengeId && (
          <TradesInfo challengeId={params?.challengeId} />
        )}
      </div>
    </div>
  )
}

export default ChartRenderingLayout
