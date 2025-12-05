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
    <div className="h-[calc(100%-86px)] w-full overflow-y-auto space-y-1 ">
      <Loader ref={(ref) => ref?.showLoader(isLoadingCandles)} />
      <ChartHeader />
      <div className="flex flex-row">
        <div className="flex flex-col w-[calc(100%-350px)]">
          <div className="flex">
            <ChartRenderer />
            <Trades />
          </div>
          {params?.challengeId && (
            <TradesInfo challengeId={params?.challengeId} />
          )}
        </div>
        <div className="w-[350px] h-full">
          <PlaceOrder />
        </div>
      </div>
    </div>
  )
}

export default ChartRenderingLayout
