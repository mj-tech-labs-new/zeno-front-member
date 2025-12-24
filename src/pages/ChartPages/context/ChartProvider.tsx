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
import {toast} from 'react-toastify'

import {useSocketProvider} from '@/GlobalProvider/SocketProvider'
import {SocketEmitter} from '@/helpers'
import {APICall, Endpoints} from '@/services'
import {Store} from '@/store'
import {ChallengeStageType, GetChallengeByIdType} from '@/types/ChallengeTypes'
import {
  CandleObjectType,
  ChartInfoObjectType,
  ChartObjectProps,
  ChartSocketHeaderProps,
  DrawingData,
  LivePriceSocketType,
  TokenDetails,
} from '@/types/ChartTypes'
import {DropDownObjectType, GeneralProps} from '@/types/CommonTypes'
import {ChartShapesType, ChartTimePeriodType} from '@/types/UnionTypes'

interface OtherLoaderType {
  isDropdownLoading: boolean
}

const ChartContext = createContext<{
  leverageValueArray: DropDownObjectType[]
  setLeverageValueArray: Dispatch<SetStateAction<DropDownObjectType[]>>
  selectedLeverage: DropDownObjectType | undefined
  setSelectedLeverage: Dispatch<SetStateAction<DropDownObjectType | undefined>>
  challengeId: string | null
  setChallengeId: Dispatch<SetStateAction<string | null>>
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
  setChartSocketData: Dispatch<SetStateAction<ChartSocketHeaderProps | null>>
  chartSocketData: ChartSocketHeaderProps | null
  selectedIndex: ChartTimePeriodType | null
  setSelectedIndex: Dispatch<SetStateAction<ChartTimePeriodType>>
  selectedToken: TokenDetails | null
  setSelectedToken: Dispatch<SetStateAction<TokenDetails | null>>
  tokenList: TokenDetails[] | null
  setTokenList: Dispatch<SetStateAction<TokenDetails[] | null>>
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
  setLiveCandle: Dispatch<SetStateAction<CandleObjectType | null>>
  liveCandle: CandleObjectType | null
  totalShapes: DrawingData[]
  setTotalShapes: Dispatch<SetStateAction<DrawingData[]>>
  singleCandleData: RefObject<ChartObjectProps | null>
  totalTokenData: Record<string, CandleObjectType> | null
  setTotalTokenData: Dispatch<
    SetStateAction<Record<string, CandleObjectType> | null>
  >
}>({
  totalTokenData: null,
  setTotalTokenData: () => {},
  liveCandle: null,
  setLiveCandle: () => {},
  chartSocketData: null,
  setChartSocketData: () => {},
  leverageValueArray: [],
  setChallengeId: () => {},
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
  selectedToken: null,
  setSelectedToken: () => {},
  selectedIndex: '1m',
  setSelectedIndex: () => {},
  chartInfo: null,
  setChartInfo: () => {},
  totalCandleData: [],
  setTotalCandleData: () => {},
  isLoadingCandles: false,
  setIsLoadingCandles: () => {},
  selectedTool: null,
  setSelectedTool: () => {},
  chartAreaRef: {current: null},
  firstChartRef: {current: null},
  chartObjectRef: {current: null},
  volumeSeriesRef: {current: null},
  singleCandleData: {current: null},
})

const ChartProvider = (props: Required<Pick<GeneralProps, 'children'>>) => {
  const [leverageValueArray, setLeverageValueArray] = useState<
    DropDownObjectType[]
  >([])
  const [totalTokenData, setTotalTokenData] = useState<Record<
    string,
    CandleObjectType
  > | null>(null)
  const [selectedLeverage, setSelectedLeverage] = useState<DropDownObjectType>()
  const {socketRef} = useSocketProvider()
  const [challengeId, setChallengeId] = useState<null | string>(null)
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
  const [liveCandle, setLiveCandle] = useState<CandleObjectType | null>(null)

  const singleCandleData = useRef<ChartObjectProps | null>(null)
  const [chartSocketData, setChartSocketData] =
    useState<ChartSocketHeaderProps | null>(null)
  const isLastCandle = useRef(false)
  const totalCandlesCount = useRef(0)
  const [otherLoading, setOtherLoading] = useState<OtherLoaderType>({
    isDropdownLoading: true,
  })
  const [selectedIndex, setSelectedIndex] = useState<ChartTimePeriodType>(
    Store.getState()?.chartData?.frame ?? '1m'
  )
  const [selectedTool, setSelectedTool] = useState<ChartShapesType | null>(
    'cursor'
  )
  const [isLoadingCandles, setIsLoadingCandles] = useState(true)
  const [chartInfo, setChartInfo] = useState<ChartInfoObjectType | null>(null)
  const [totalCandleData, setTotalCandleData] = useState<CandleObjectType[]>([])
  const firstChartRef = useRef<HTMLDivElement | null>(null)
  const chartObjectRef = useRef<IChartApi | null>(null)
  const [totalShapes, setTotalShapes] = useState<DrawingData[]>([])
  const currnetLimit = useRef(100)
  const [tokenList, setTokenList] = useState<TokenDetails[] | null>(null)
  const [selectedToken, setSelectedToken] = useState<TokenDetails | null>(null)
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
        timeframe: selectedIndex ?? Store.getState()?.chartData?.frame,
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
      totalTokenData,
      setTotalTokenData,
      chartSocketData,
      setChartSocketData,
      setChallengeId,
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
      singleCandleData,
      setLiveCandle,
      liveCandle,
    }),
    [
      totalTokenData,
      chartSocketData,
      leverageValueArray,
      selectedLeverage,
      handleCommonMouseDown,
      handleCommonMouseUp,
      totalShapes,
      tempShape,
      enableChartActions,
      disableChartActions,
      livePrice,
      getCandleHistory,
      otherLoading,
      tokenList,
      selectedToken,
      chartInfo,
      totalCandleData,
      selectedTool,
      isLoadingCandles,
      selectedIndex,
      getChallengeByIdArray,
      currentStageArray,
      challengeId,
      liveCandle,
    ]
  )

  const getTokenList = useCallback(() => {
    setOtherLoading({isDropdownLoading: true})
    APICall('get', Endpoints.suppportedToken)
      .then((res: any) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          setTokenList(res?.data?.allTokens)
          const btc = res?.data?.allTokens?.find(
            (item: TokenDetails) => item?.token_symbol === 'BTC'
          )
          setSelectedToken(btc ?? null)
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
    if (selectedIndex) {
      const tokenToUse = tokenList?.find(
        (item) => item?.token_symbol === selectedToken?.token_symbol
      )
      setIsLoadingCandles(true)
      socketRef?.current?.off()
      getCandleHistory(tokenToUse?.token_symbol ?? 'BTC', currnetLimit.current)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, selectedToken, tokenList])

  useEffect(() => {
    getTokenList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const socket = socketRef.current
    if (isLoadingCandles || !socket) return
    socket.on(SocketEmitter.Emitter.live_prices, (data) => {
      const tokenPrices = data?.data?.prices
      const findTokenName = tokenList?.find(
        (item) => item?.token_symbol === selectedToken?.token_symbol
      )

      if (!findTokenName) return
      const priceData: LivePriceSocketType =
        tokenPrices?.[findTokenName?.token_symbol]
      setLivePrice(priceData?.price)
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
