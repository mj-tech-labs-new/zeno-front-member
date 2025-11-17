import {
  createContext,
  Dispatch,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {useSelector} from 'react-redux'
import {useLocation, useNavigate} from 'react-router-dom'
import {io, Socket} from 'socket.io-client'

import {
  GetChallengeByIdType,
  TradingStatisticsType,
} from '@/types/ChallengeTypes'
import {GeneralProps, StorageProps} from '@/types/CommonTypes'

import {
  getChallengeByIdApi,
  tradingStatisticsApi,
} from '../api/ChallengeDashboardApi'

const ChallengeDashboardContext = createContext<{
  getChallengeByIdArray: GetChallengeByIdType[]
  setGetChallengeByIdArray: Dispatch<SetStateAction<GetChallengeByIdType[]>>
  tradingStatistics: TradingStatisticsType | null
  setTradingStatistics: Dispatch<SetStateAction<TradingStatisticsType | null>>
  socketRef: RefObject<Socket | null>
  showLoader: boolean
  setShowLoader: Dispatch<SetStateAction<boolean>>
  challengeIdRef: RefObject<null | string>
}>({
  getChallengeByIdArray: [],
  setGetChallengeByIdArray: () => {},
  tradingStatistics: null,
  setTradingStatistics: () => {},
  socketRef: {current: null},
  showLoader: true,
  setShowLoader: () => {},
  challengeIdRef: {current: null},
})

const ChallengeDashboardProvider = (
  props: Required<Pick<GeneralProps, 'children'>>
) => {
  const UserData = useSelector((state: StorageProps) => state.userData?.user)
  const {children} = props
  const [showLoader, setShowLoader] = useState(false)
  const [getChallengeByIdArray, setGetChallengeByIdArray] = useState<
    GetChallengeByIdType[]
  >([])
  const [tradingStatistics, setTradingStatistics] =
    useState<TradingStatisticsType | null>(null)
  const socketRef = useRef<Socket | null>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const challengeIdRef = useRef<null | string>(null)
  const challengeId = useMemo(() => location.state, [location.state])
  const valueObj = useMemo(
    () => ({
      challengeIdRef,
      setShowLoader,
      showLoader,
      getChallengeByIdArray,
      setGetChallengeByIdArray,
      tradingStatistics,
      setTradingStatistics,
      socketRef,
    }),
    [getChallengeByIdArray, showLoader, tradingStatistics]
  )

  useEffect(() => {
    setShowLoader(true)
    getChallengeByIdApi({challenge_id: challengeId})
      .then((res) => {
        setGetChallengeByIdArray(res)
      })
      .finally(() => setShowLoader(false))
  }, [challengeId])

  useEffect(() => {
    if (getChallengeByIdArray?.length === 0) return
    tradingStatisticsApi({
      challenge_id: challengeId,
    }).then((res) => setTradingStatistics(res))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getChallengeByIdArray])

  useEffect(() => {
    if (showLoader || socketRef.current) return
    socketRef.current = io(import.meta.env.VITE_API_BASE_URL, {
      extraHeaders: {
        token: `Bearer ${UserData?.token ?? ''}`,
      },
    })
  }, [UserData?.token, getChallengeByIdArray.length, showLoader, socketRef])

  useEffect(() => {
    if (!challengeId) navigate(-1)
    challengeIdRef.current = challengeId
  }, [challengeId, navigate])

  return (
    <ChallengeDashboardContext.Provider value={valueObj}>
      {children}
    </ChallengeDashboardContext.Provider>
  )
}

export default ChallengeDashboardProvider
export const useChallengeProvider = () => useContext(ChallengeDashboardContext)
