import {useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'

import {GoBackButton, LogoComponent} from '@/components'
import {useSocketProvider} from '@/GlobalProvider/SocketProvider'
import {English, SocketEmitter} from '@/helpers'

import {getChallengeByIdApi} from '../ChallengeDashboard/api/ChallengeDashboardApi'
import ChartProvider, {useChartProvider} from './context/ChartProvider'
import ChartRenderingLayout from './section/ChartRenderingLayout'

const Chart = () => {
  const params = useParams()
  const {socketRef} = useSocketProvider()
  const {setGetChallengeByIdArray} = useChartProvider()
  const navigate = useNavigate()

  useEffect(() => {
    if (!socketRef.current || !params.challengeId) return
    socketRef.current?.on(
      SocketEmitter.challenge_passed + params.challengeId,
      (data) => {
        if (data) {
          toast.success(data?.message)
          getChallengeByIdApi({challenge_id: params?.challengeId ?? ''}).then(
            (res) => {
              setGetChallengeByIdArray(res)
            }
          )
        }
      }
    )

    socketRef.current?.on(
      SocketEmitter.challenge_failed + params.challengeId,
      (data) => {
        if (data) {
          toast.error(data.message)
          navigate('/dashboard')
        }
      }
    )
  }, [navigate, params.challengeId, setGetChallengeByIdArray, socketRef])
  return (
    <ChartProvider>
      <div className="h-screen w-screen">
        <div className="flex gap-5 p-6">
          <GoBackButton className="!h-4" />
          <LogoComponent
            className="!w-4"
            layoutClassName="flex-row-reverse"
            singleLineContent={English.E20}
          />
        </div>
        <ChartRenderingLayout />
      </div>
    </ChartProvider>
  )
}

export default Chart
