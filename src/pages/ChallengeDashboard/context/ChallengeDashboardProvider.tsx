import {
  createContext,
  Dispatch,
  RefObject,
  SetStateAction,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'

import {
  GetChallengeByIdType,
  TradingStatisticsType,
} from '@/types/ChallengeTypes'
import {GeneralProps} from '@/types/CommonTypes'

const ChallengeDashboardContext = createContext<{
  getChallengeByIdArray: GetChallengeByIdType[]
  setGetChallengeByIdArray: Dispatch<SetStateAction<GetChallengeByIdType[]>>
  tradingStatistics: TradingStatisticsType | null
  setTradingStatistics: Dispatch<SetStateAction<TradingStatisticsType | null>>
  showLoader: boolean
  setShowLoader: Dispatch<SetStateAction<boolean>>
  challengeId: string | null
  setChallengeId: Dispatch<SetStateAction<string | null>>
}>({
  getChallengeByIdArray: [],
  setGetChallengeByIdArray: () => {},
  tradingStatistics: null,
  setTradingStatistics: () => {},
  showLoader: true,
  setShowLoader: () => {},
  setChallengeId: () => {},
  challengeId: null,
})

const ChallengeDashboardProvider = (
  props: Required<Pick<GeneralProps, 'children'>>
) => {
  const {children} = props
  const [showLoader, setShowLoader] = useState(false)
  const [getChallengeByIdArray, setGetChallengeByIdArray] = useState<
    GetChallengeByIdType[]
  >([])
  const [tradingStatistics, setTradingStatistics] =
    useState<TradingStatisticsType | null>(null)
  const [challengeId, setChallengeId] = useState<null | string>(null)
  const valueObj = useMemo(
    () => ({
      setShowLoader,
      showLoader,
      getChallengeByIdArray,
      setGetChallengeByIdArray,
      tradingStatistics,
      setTradingStatistics,
      challengeId,
      setChallengeId,
    }),
    [challengeId, getChallengeByIdArray, showLoader, tradingStatistics]
  )

  return (
    <ChallengeDashboardContext.Provider value={valueObj}>
      {children}
    </ChallengeDashboardContext.Provider>
  )
}

export default ChallengeDashboardProvider
export const useChallengeProvider = () => useContext(ChallengeDashboardContext)
