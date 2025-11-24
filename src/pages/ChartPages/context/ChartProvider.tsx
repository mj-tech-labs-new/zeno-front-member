/* eslint-disable consistent-return */
import {
  CandlestickData,
  CandlestickSeriesOptions,
  CandlestickStyleOptions,
  DeepPartial,
  HistogramData,
  HistogramSeriesOptions,
  HistogramStyleOptions,
  IChartApi,
  ISeriesApi,
  SeriesOptionsCommon,
  type Time,
  WhitespaceData,
} from 'lightweight-charts'
import {
  createContext,
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'
import {toast} from 'react-toastify'
import {io, Socket} from 'socket.io-client'

import {SocketEmitter} from '@/helpers'
import {getChallengeByIdApi} from '@/pages/ChallengeDashboard/api/ChallengeDashboardApi'
import {APICall, Endpoints} from '@/services'
import {ChallengeStageType, GetChallengeByIdType} from '@/types/ChallengeTypes'
import {
  CandleObjectType,
  ChartInfoObjectType,
  DrawingData,
  LivePriceSocketType,
} from '@/types/ChartTypes'
import {
  DropDownObjectType,
  GeneralProps,
  StorageProps,
} from '@/types/CommonTypes'
import {ChartShapesType, ChartTimePeriodType} from '@/types/UnionTypes'

interface OtherLoaderType {
  isDropdownLoading: boolean
}

const ChartContext = createContext<{
  leverageValueArray: DropDownObjectType[]
  setLeverageValueArray: Dispatch<SetStateAction<DropDownObjectType[]>>
  selectedLeverage: DropDownObjectType | undefined
  setSelectedLeverage: Dispatch<SetStateAction<DropDownObjectType | undefined>>
  challengeId: string
  handleCommonMouseDown: () => void
  handleCommonMouseUp: () => void
  selectedTool: ChartShapesType | null
  setSelectedTool: Dispatch<SetStateAction<ChartShapesType | null>>
  livePrice: number
  setLivePrice: Dispatch<SetStateAction<number>>
  getChallengeByIdArray: GetChallengeByIdType[]
  setGetChallengeByIdArray: Dispatch<SetStateAction<GetChallengeByIdType[]>>
  currentStageArray: ChallengeStageType[]
  setCurrentStageArray: Dispatch<SetStateAction<ChallengeStageType[]>>
  socketRef: RefObject<Socket | null>
  isLoadingCandles: boolean
  setIsLoadingCandles: Dispatch<SetStateAction<boolean>>
  totalCandleData: CandleObjectType[]
  setTotalCandleData: Dispatch<SetStateAction<CandleObjectType[]>>
  firstChartRef: RefObject<HTMLDivElement | null>
  chartObjectRef: RefObject<IChartApi | null>
  volumeSeriesRef: RefObject<ISeriesApi<
    'Histogram',
    Time,
    WhitespaceData | HistogramData,
    HistogramSeriesOptions,
    DeepPartial<HistogramStyleOptions & SeriesOptionsCommon>
  > | null>
  chartAreaRef: RefObject<ISeriesApi<
    'Candlestick',
    Time,
    CandlestickData | WhitespaceData,
    CandlestickSeriesOptions,
    DeepPartial<CandlestickStyleOptions & SeriesOptionsCommon>
  > | null>
  chartInfo: ChartInfoObjectType | null
  setChartInfo: Dispatch<SetStateAction<ChartInfoObjectType | null>>
  selectedIndex: ChartTimePeriodType
  setSelectedIndex: Dispatch<SetStateAction<ChartTimePeriodType>>
  selectedToken: string
  setSelectedToken: Dispatch<SetStateAction<string>>
  tokenList: Record<string, string> | null
  setTokenList: Dispatch<SetStateAction<Record<string, string> | null>>
  setOtherLoading: Dispatch<SetStateAction<OtherLoaderType>>
  otherLoading: OtherLoaderType
  getCandleHistory: (tokenName: string, limit: number) => void
  currnetLimit: RefObject<number>
  isCallingCurrent: RefObject<boolean>
  isLastCandle: RefObject<boolean>
  totalCandlesCount: RefObject<number>
  disableChartActions: () => void
  enableChartActions: () => void
  isDrawing: RefObject<boolean>
  tempShape: DrawingData | null
  setTempShape: Dispatch<SetStateAction<DrawingData | null>>
  totalShapes: DrawingData[]
  setTotalShapes: Dispatch<SetStateAction<DrawingData[]>>
}>({
  leverageValueArray: [],
  setLeverageValueArray: () => {},
  selectedLeverage: {title: ''},
  setSelectedLeverage: () => {},
  challengeId: '',
  handleCommonMouseDown: () => {},
  handleCommonMouseUp: () => {},
  totalShapes: [],
  setTotalShapes: () => {},
  tempShape: null,
  setTempShape: () => {},
  isDrawing: {current: false},
  enableChartActions: () => {},
  disableChartActions: () => {},
  livePrice: 0,
  setLivePrice: () => {},
  getChallengeByIdArray: [],
  setGetChallengeByIdArray: () => {},
  currentStageArray: [],
  setCurrentStageArray: () => {},
  totalCandlesCount: {current: 0},
  isLastCandle: {current: false},
  isCallingCurrent: {current: false},
  getCandleHistory: () => {},
  currnetLimit: {current: 0},
  otherLoading: {isDropdownLoading: true},
  setOtherLoading: () => {},
  tokenList: null,
  setTokenList: () => {},
  selectedToken: 'Bitcoin',
  setSelectedToken: () => {},
  selectedIndex: '1m',
  setSelectedIndex: () => {},
  chartInfo: null,
  setChartInfo: () => {},
  totalCandleData: [],
  setTotalCandleData: () => {},
  isLoadingCandles: false,
  setIsLoadingCandles: () => {},
  socketRef: {current: null},
  selectedTool: null,
  setSelectedTool: () => {},
  chartAreaRef: {current: null},
  firstChartRef: {current: null},
  chartObjectRef: {current: null},
  volumeSeriesRef: {current: null},
})

const ChartProvider = (props: Required<Pick<GeneralProps, 'children'>>) => {
  const [leverageValueArray, setLeverageValueArray] = useState<
    DropDownObjectType[]
  >([])
  const [selectedLeverage, setSelectedLeverage] = useState<DropDownObjectType>()
  const location = useLocation()
  const challengeId = useMemo(() => location.state, [location.state])
  const UserData = useSelector((state: StorageProps) => state.userData?.user)
  const isDrawing = useRef(false)
  const [tempShape, setTempShape] = useState<DrawingData | null>(null)
  const {children} = props
  const [livePrice, setLivePrice] = useState(0)
  const [getChallengeByIdArray, setGetChallengeByIdArray] = useState<
    GetChallengeByIdType[]
  >([])
  const [currentStageArray, setCurrentStageArray] = useState<
    ChallengeStageType[]
  >([])
  const isLastCandle = useRef(false)
  const totalCandlesCount = useRef(0)
  const [otherLoading, setOtherLoading] = useState<OtherLoaderType>({
    isDropdownLoading: true,
  })
  const [selectedIndex, setSelectedIndex] = useState<ChartTimePeriodType>('1m')
  const [selectedTool, setSelectedTool] = useState<ChartShapesType | null>(
    'cursor'
  )
  const socketRef = useRef<Socket | null>(null)
  const [isLoadingCandles, setIsLoadingCandles] = useState(true)
  const [chartInfo, setChartInfo] = useState<ChartInfoObjectType | null>(null)
  const [totalCandleData, setTotalCandleData] = useState<CandleObjectType[]>([])
  const firstChartRef = useRef<HTMLDivElement | null>(null)
  const chartObjectRef = useRef<IChartApi | null>(null)
  const [totalShapes, setTotalShapes] = useState<DrawingData[]>([])
  const currnetLimit = useRef(50)
  const [tokenList, setTokenList] = useState<Record<string, string> | null>(
    null
  )
  const [selectedToken, setSelectedToken] = useState('Bitcoin')
  const chartAreaRef =
    useRef<
      ISeriesApi<
        'Candlestick',
        Time,
        CandlestickData | WhitespaceData,
        CandlestickSeriesOptions,
        DeepPartial<CandlestickStyleOptions & SeriesOptionsCommon>
      >
    >(null)
  const volumeSeriesRef = useRef<ISeriesApi<'Histogram'> | null>(null)
  const isCallingCurrent = useRef(false)

  const getCandleHistory = useCallback(
    (tokenName: string, limit: number) => {
      if (isCallingCurrent.current || isLastCandle.current) {
        setIsLoadingCandles(false)
        return
      }
      isCallingCurrent.current = true
      const paramsPayload = {
        timeframe: selectedIndex,
        limit,
      }
      APICall('get', Endpoints.candleHistory(tokenName), {}, paramsPayload)
        .then((res: any) => {
          isCallingCurrent.current = false
          if (res?.status === 200 && res?.statusCode === 200) {
            if (totalCandlesCount.current === res?.data?.count) {
              isLastCandle.current = true
              setIsLoadingCandles(false)
              return
            }
            totalCandlesCount.current = res?.data?.count
            setChartInfo({
              symbol: res?.data?.symbol,
              timeframe: res?.data?.timeframe,
              count: res?.data?.count,
              fullSymbolName: res?.data?.data?.[0]?.symbol,
              change: '',
              changeAmount: '',
              high: 0,
              low: 0,
              volume: 0,
              open: 0,
            })
            setTotalCandleData(res?.data?.data)
          } else {
            toast.error(res?.data?.message)
          }
        })
        .catch((e) => {
          toast.error(e?.data?.message)
          isCallingCurrent.current = false
        })
        .finally(() => {
          setIsLoadingCandles(false)
        })
    },
    [selectedIndex]
  )

  useEffect(() => {
    if (socketRef.current) return
    setIsLoadingCandles(true)
    socketRef.current = io(import.meta.env.VITE_API_BASE_URL, {
      extraHeaders: {
        token: `Bearer ${UserData?.token ?? ''}`,
      },
      autoConnect: false,
    })
    return () => {
      socketRef.current?.removeAllListeners()
      socketRef.current?.disconnect()
      socketRef.current = null
    }
  }, [UserData?.token])

  const enableChartActions = useCallback(() => {
    if (!chartObjectRef.current) return
    chartObjectRef.current.applyOptions({
      handleScroll: true,
      handleScale: true,
      crosshair: {mode: 1},
    })
  }, [chartObjectRef])

  const disableChartActions = useCallback(() => {
    if (!chartObjectRef.current) return
    chartObjectRef.current.applyOptions({
      handleScroll: false,
      handleScale: false,
      crosshair: {mode: 0},
    })
  }, [])

  const handleCommonMouseDown = useCallback(() => {
    isDrawing.current = true
  }, [])

  const handleCommonMouseUp = useCallback(() => {
    setSelectedTool('cursor')
    isDrawing.current = false
  }, [])

  const defaultValue = useMemo(
    () => ({
      leverageValueArray,
      setLeverageValueArray,
      selectedLeverage,
      setSelectedLeverage,
      handleCommonMouseDown,
      handleCommonMouseUp,
      totalShapes,
      setTotalShapes,
      tempShape,
      setTempShape,
      isDrawing,
      enableChartActions,
      disableChartActions,
      livePrice,
      setLivePrice,
      isLastCandle,
      totalCandlesCount,
      isCallingCurrent,
      getCandleHistory,
      currnetLimit,
      otherLoading,
      setOtherLoading,
      tokenList,
      setTokenList,
      selectedToken,
      setSelectedToken,
      chartInfo,
      setChartInfo,
      volumeSeriesRef,
      totalCandleData,
      setTotalCandleData,
      socketRef,
      setSelectedTool,
      selectedTool,
      isLoadingCandles,
      setIsLoadingCandles,
      firstChartRef,
      chartAreaRef,
      chartObjectRef,
      selectedIndex,
      setSelectedIndex,
      getChallengeByIdArray,
      setGetChallengeByIdArray,
      currentStageArray,
      setCurrentStageArray,
      challengeId,
    }),
    [
      leverageValueArray,
      setLeverageValueArray,
      selectedLeverage,
      setSelectedLeverage,
      handleCommonMouseDown,
      handleCommonMouseUp,
      totalShapes,
      tempShape,
      isDrawing,
      enableChartActions,
      disableChartActions,
      livePrice,
      setLivePrice,
      getChallengeByIdArray,
      setGetChallengeByIdArray,
      currentStageArray,
      setCurrentStageArray,
      getCandleHistory,
      otherLoading,
      tokenList,
      chartInfo,
      isLoadingCandles,
      selectedIndex,
      selectedToken,
      selectedTool,
      totalCandleData,
      challengeId,
    ]
  )

  const getTokenList = useCallback(() => {
    setOtherLoading({isDropdownLoading: true})
    APICall('get', Endpoints.suppportedToken)
      .then((res: any) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          setTokenList(res?.data?.Tokens)
        } else {
          toast.error(res?.message)
        }
      })
      .catch((error) => {
        toast.error(error?.data?.message)
      })
      .finally(() => {
        setOtherLoading((prev) => ({...prev, isDropdownLoading: false}))
      })
  }, [])

  useEffect(() => {
    if (socketRef.current && selectedIndex) {
      const tokenToUse = Object.entries(tokenList ?? {}).find(
        ([_, value]) => value === selectedToken
      )
      setIsLoadingCandles(true)
      getCandleHistory(
        tokenToUse ? tokenToUse?.[0] : 'BTC',
        currnetLimit.current
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, selectedToken])

  useEffect(() => {
    getTokenList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!challengeId) return
    getChallengeByIdApi({challenge_id: challengeId}).then((res) => {
      setGetChallengeByIdArray(res)
    })
  }, [challengeId])

  useEffect(() => {
    const socket = socketRef.current
    if (isLoadingCandles || !socket) return
    socket.on(SocketEmitter.Emitter.live_prices, (data) => {
      const tokenPrices = data.data.prices
      const findTokenName = Object.entries(tokenList ?? {}).find(
        ([_, value]) => value === selectedToken
      )
      if (!findTokenName) return
      const priceData: LivePriceSocketType = tokenPrices?.[findTokenName[0]]
      setLivePrice(priceData.price)
    })
  }, [isLoadingCandles, selectedToken, socketRef, tokenList])

  return (
    <ChartContext.Provider value={defaultValue}>
      {children}
    </ChartContext.Provider>
  )
}

export default ChartProvider

export const useChartProvider = () => useContext(ChartContext)
