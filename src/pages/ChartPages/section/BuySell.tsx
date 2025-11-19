import {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react'

import {
  DropDown,
  ImageComponent,
  InputContainer,
  RangeSelector,
} from '@/components'
import {Constants, English, Images, Utility} from '@/helpers'
import {BuyOrSelProps} from '@/types/ChartTypes'
import {DropDownObjectType} from '@/types/CommonTypes'

import {useChartProvider} from '../context/ChartProvider'
import ActionButton from './ActionButton'
import SlTp from './SlTp'

const BuySell = (props: BuyOrSelProps) => {
  const {activeIndex} = props
  const {
    isLoadingCandles,
    socketRef,
    selectedToken,
    tokenList,
    getChallengeByIdArray,
    chartInfo,
    currentStageArray,
    buyOrSellApiResArray,
    livePrice,
  } = useChartProvider()
  const [inputValues, setInputValues] = useState({
    price: '',
    amount: '',
    total: '',
  })
  const [rangeValue, setRangeValue] = useState(0)
  const [leverageValueArray, setLeverageValueArray] = useState<
    DropDownObjectType[]
  >([])
  const [selectedLeverage, setSelectedLeverage] = useState<DropDownObjectType>()
  const [stopLoss, setStopLoss] = useState<number>()
  const [takeProfit, setTakeProfit] = useState<number>()

  const leverage = useMemo(
    () => currentStageArray?.[0]?.leverage,
    [currentStageArray]
  )

  const amountRef = useRef(0)

  useEffect(() => {
    const currentStages = getChallengeByIdArray?.[0]?.current_stage ?? 0
    if (!getChallengeByIdArray?.[0]) return

    const stages = getChallengeByIdArray[0].ChallengeStage[currentStages]

    if (!stages) return

    const levArray = Array.from({length: stages.leverage}).map((_, index) => ({
      title: (index + 1).toString(),
    }))
    setLeverageValueArray(levArray)
    setSelectedLeverage(levArray[0])
  }, [getChallengeByIdArray])

  const handleInputChange = useCallback(
    (name: keyof typeof inputValues, value: string) => {
      if (name === 'amount') {
        setRangeValue(0)
      }
      setInputValues((prev) => ({
        ...prev,
        [name]: Utility.validPointValue(Utility.validFloatNumber(value)),
        total: Utility.validPointValue(
          Utility.validFloatNumber(
            (
              (Number(name === 'amount' ? value : prev.amount) *
                Number(name === 'price' ? value : prev.price)) /
              Number(selectedLeverage?.title)
            ).toString()
          )
        ),
      }))
    },
    [selectedLeverage?.title]
  )

  useEffect(() => {
    setInputValues({
      price: '',
      amount: '',
      total: '',
    })
  }, [selectedLeverage])

  useEffect(() => {
    if (isLoadingCandles || !socketRef.current) return
    setInputValues((prev) => ({
      ...prev,
      price: livePrice.toString() ?? '0',
      total: (
        (livePrice * Number(prev.amount)) /
        Number(selectedLeverage?.title)
      ).toString(),
    }))
  }, [
    isLoadingCandles,
    leverage,
    livePrice,
    selectedLeverage?.title,
    selectedToken,
    socketRef,
    tokenList,
  ])

  useEffect(() => {
    amountRef.current =
      buyOrSellApiResArray?.[0]?.usdt_balance_after ??
      getChallengeByIdArray?.[0]?.current_usdt ??
      0
  }, [buyOrSellApiResArray, getChallengeByIdArray])

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-4">
        <span className="text-base !leading-8 text-chart-text-primary-color font-semibold ">
          {English.E130}
        </span>
        <div className="flex items-center gap-1">
          <span className="text-extra-light-success-color text-xs font-semibold !leading-5">
            {Utility.numberConversion(
              buyOrSellApiResArray?.[0]?.usdt_balance_after ??
                getChallengeByIdArray?.[0]?.current_usdt
            )}
          </span>
          <ImageComponent className="!w-4" imageUrl={Images.walletImg} />
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <span>Leverage :</span>
          <div>{selectedLeverage?.title ?? '1'}x</div>
        </div>
        <DropDown
          className="!max-h-32 mt-2 !overflow-auto"
          dropDownData={leverageValueArray}
          selectedValue={selectedLeverage ?? {title: '1'}}
          onSelectValue={(data) => {
            setSelectedLeverage(data)
          }}
        />
      </div>
      {Constants.BuySellInputArray?.Market.map((item, index) => {
        const {name, placeHolder, textContent} = item

        return (
          <div key={`name_${name}`} className="!mb-3">
            <div className="px-4 py-3 rounded-xl border-2 border-solid border-neutral-secondary-color">
              <div className="flex justify-between gap-2">
                <span className="shrink-0 text-light-neutral-color text-sm !leading-6 font-medium capitalize">
                  {name}
                </span>
                <div className="w-full gap-2.5 flex items-center">
                  <InputContainer
                    disabled={name !== 'amount'}
                    layoutClassName="!w-full"
                    placeholder={name === 'price' ? placeHolder : ''}
                    value={inputValues?.[name as keyof typeof inputValues]}
                    className="!p-0 !border-none !w-full [&>input]:!text-end [&>input]:!h-6
                [&>input]:!text-chart-text-primary-color [&>input]:!text-sm [&>input]:placeholder:!text-chart-text-primary-color [&>input]:!w-full !leading-6 !font-medium"
                    onChange={(e) => {
                      handleInputChange(
                        name as keyof typeof inputValues,
                        e.target.value
                      )
                    }}
                  />

                  {name === 'amount' && (
                    <div className="w-[1px] bg-primary-dark-blue-color h-full" />
                  )}
                  <span className="text-neutral-primary-color font-medium text-sm !leading-6">
                    {index === 0 && textContent}
                    {index === 1 && chartInfo?.fullSymbolName.split('USDT')}
                  </span>
                </div>
              </div>
            </div>
            {name === 'amount' && (
              <RangeSelector
                className="!mt-3 mb-4"
                rangeValue={rangeValue}
                sliderWidth={300}
                setRangeValue={(value) => {
                  const percentValue = value === 0 ? 0 : value / 100
                  const tokenValue = Number(amountRef.current) * percentValue
                  setInputValues((prev) => ({
                    ...prev,
                    amount: (tokenValue / livePrice).toString(),
                  }))
                  setRangeValue(value)
                }}
              />
            )}
          </div>
        )
      })}

      {Number(inputValues.total) >
        getChallengeByIdArray?.[0]?.initial_capital && (
        <span className="text-light-danger-color text-xs/6 font-normal tracking-[0.4px]">
          {English.E279}
        </span>
      )}

      <div className="flex items-center gap-3">
        <ActionButton
          activeIndex={activeIndex}
          leverage={selectedLeverage?.title}
          order_type="market"
          price={Number(inputValues?.price)}
          quantity={Number(inputValues?.amount)}
          setInputValuesMarket={setInputValues}
          stopLoss={stopLoss}
          takeProfit={takeProfit}
          total={Number(inputValues?.total)}
        />
      </div>
      <div className="flex flex-col pointer-events-none opacity-60 ">
        <SlTp
          closingQuantity={Number(inputValues.total)}
          heading="Stop Loss"
          marketPrice={Number(inputValues.amount)}
          subHeading="Stop loss "
          setSlMarketPrice={(value) => {
            setStopLoss(value)
          }}
        />
        <SlTp
          closingQuantity={Number(inputValues.total)}
          heading="Take Profit"
          marketPrice={Number(inputValues.amount)}
          subHeading="Take Profit "
          setSlMarketPrice={(value) => {
            setTakeProfit(value)
          }}
        />
      </div>
    </div>
  )
}

export default memo(BuySell)
