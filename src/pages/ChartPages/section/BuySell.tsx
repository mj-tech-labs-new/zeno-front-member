import {Fragment, memo, useCallback, useEffect, useRef, useState} from 'react'
import {useSelector} from 'react-redux'

import {Divider, ImageComponent} from '@/components'
import CommonPriceSwitch from '@/components/CommonPriceSwitch/CommonPriceSwitch'
import CheckBoxInputContainer from '@/components/InputContainer/CheckBoxInputContainer'
import {useSocketProvider} from '@/GlobalProvider/SocketProvider'
import {Constants, English, Images, Utility} from '@/helpers'
import {Store} from '@/store'
import {BuyOrSelProps, CommonBuyAndSellProp} from '@/types/ChartTypes'
import {StorageProps} from '@/types/CommonTypes'

import MaxOpenAndMargin from '../components/MaxOpenAndMargin'
import {useChartProvider} from '../context/ChartProvider'
import ActionButton from './ActionButton'
import StopLoss from './StopLoss'

const BuySell = (props: BuyOrSelProps) => {
  const {margin_mode} = props
  const {
    isLoadingCandles,
    selectedToken,
    getChallengeByIdArray,
    livePrice,
    selectedLeverage,
  } = useChartProvider()
  const [amountPriceType, setAmountPriceType] = useState('')
  const {socketRef} = useSocketProvider()
  const [checked, setChecked] = useState(false)
  const [inputValues, setInputValues] = useState({
    price: '',
    amount: '',
    total: '',
  })
  const [rangeValue, setRangeValue] = useState(0)
  const tokenQntyRef = useRef('0')
  const initialAmountRef = useRef(0)
  const ChartData = useSelector((state: StorageProps) => state.chartData)

  const [stopLossData, setStopLossData] = useState<
    Pick<CommonBuyAndSellProp, 'stop_loss'> &
      Pick<CommonBuyAndSellProp, 'take_profit'>
  >({stop_loss: [], take_profit: []})
  const amountRef = useRef(0)

  const calculateOrderValues = useCallback(
    (rawAmount: string) => {
      const price = Number(inputValues.price || livePrice || 0)

      const amount = Number(rawAmount)

      if (!price || amount <= 0) {
        tokenQntyRef.current = '0'
        initialAmountRef.current = 0
        return {amount: '0', total: '0'}
      }

      let finalAmount = 0
      let finalTotal = 0

      if (ChartData?.amountType !== 'USDT') {
        finalAmount = amount

        const baseTotal = price * finalAmount

        initialAmountRef.current = baseTotal
        tokenQntyRef.current = finalAmount.toString()

        const fee =
          (finalAmount * price * getChallengeByIdArray[0].order_fee_percent) /
          100

        finalTotal = baseTotal + fee
      } else {
        finalAmount = amount

        const tokenQty = finalAmount / price

        tokenQntyRef.current = Utility.formatTo8Decimals(tokenQty)
        initialAmountRef.current = tokenQty

        const fee =
          (finalAmount * price * getChallengeByIdArray[0].order_fee_percent) /
          100

        finalTotal = tokenQty + fee
      }

      return {
        amount: Utility.formatTo8Decimals(finalAmount),
        total: Utility.formatTo8Decimals(finalTotal),
      }
    },
    [ChartData?.amountType, getChallengeByIdArray, inputValues.price, livePrice]
  )

  const handleInputChange = useCallback(
    (name: keyof typeof inputValues, value: string) => {
      if (name !== 'amount') {
        setInputValues((prev) => ({...prev, [name]: value}))
        return
      }

      const calculated = calculateOrderValues(value)

      setInputValues((prev) => ({
        ...prev,
        amount: calculated.amount,
        total: calculated.total,
      }))

      setRangeValue(0)
    },
    [calculateOrderValues]
  )
  const resetValues = useCallback(() => {
    setInputValues({
      price: '',
      amount: '',
      total: '',
    })
    initialAmountRef.current = 0
    tokenQntyRef.current = '0'
    setRangeValue(0)
  }, [])
  const handleSliderChange = useCallback(
    (sliderValue: number) => {
      const percent = sliderValue / 100
      const AmountType = Store.getState().chartData.amountType

      const balance = Number(amountRef.current)

      if (!balance || !livePrice) {
        setRangeValue(0)
        return
      }

      const rawAmount =
        AmountType === 'USDT'
          ? Utility.formatTo8Decimals(balance * percent)
          : Utility.formatTo8Decimals((balance * percent) / livePrice)

      const calculated = calculateOrderValues(rawAmount)

      setInputValues((prev) => ({
        ...prev,
        amount: calculated.amount,
        total: calculated.total,
      }))

      setRangeValue(sliderValue)
    },
    [calculateOrderValues, livePrice]
  )

  useEffect(() => {
    resetValues()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLeverage, selectedToken])

  useEffect(() => {
    if (isLoadingCandles || !socketRef.current) return
    setInputValues((prev) => ({
      ...prev,
      price: livePrice?.toString() ?? '0',
    }))
  }, [isLoadingCandles, livePrice, socketRef])

  useEffect(() => {
    amountRef.current = getChallengeByIdArray?.[0]?.current_usdt ?? 0
  }, [getChallengeByIdArray])

  useEffect(() => {
    setAmountPriceType(ChartData?.selectedToken?.name ?? 'BTC')
  }, [ChartData?.selectedToken?.name])

  useEffect(() => {
    if (!livePrice) return
    const feeToAdd =
      (Number(tokenQntyRef.current ?? 0) *
        livePrice *
        getChallengeByIdArray[0].order_fee_percent) /
      100
    setInputValues((prev) => ({
      ...prev,
      total: (initialAmountRef.current + feeToAdd).toString(),
    }))
  }, [getChallengeByIdArray, livePrice])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <span className="text-base !leading-8 text-chart-text-primary-color font-semibold ">
          {English.E130}
        </span>
        <div className="flex items-center gap-1">
          <span className="text-extra-light-success-color text-xs font-semibold !leading-5">
            {Utility.numberConversion(
              getChallengeByIdArray?.[0]?.current_usdt ?? 0
            )}
          </span>
          <ImageComponent className="!w-4" imageUrl={Images.walletImg} />
        </div>
      </div>
      {Constants.BuySellInputArray?.Market.map((item, index) => {
        const {name, placeHolder} = item

        return (
          <CommonPriceSwitch
            key={`name_${name}`}
            currentIndex={index}
            currentPriceType={amountPriceType}
            isRangeType={name === 'amount'}
            name={name}
            onModelClose={resetValues}
            placeholder={placeHolder}
            rangeValue={rangeValue}
            setRangeValue={handleSliderChange}
            showModelType={index === 1 || index === 2}
            value={inputValues?.[name as keyof typeof inputValues]}
            onChange={(e) => {
              handleInputChange(
                name as keyof typeof inputValues,
                e.target.value
              )
            }}
          />
        )
      })}

      {Number(Number(inputValues.total).toFixed(2)) >
        getChallengeByIdArray?.[0]?.current_usdt && (
        <span className="text-light-danger-color text-xs/6 font-normal tracking-[0.4px]">
          {English.E279}
        </span>
      )}

      <div className="flex items-center gap-3">
        <ActionButton
          // activeIndex={activeIndex}
          checked={checked}
          leverage={Number(selectedLeverage?.title.replace('X', ' '))}
          margin_mode={margin_mode}
          order_type="market"
          price={Number(inputValues?.price)}
          setChecked={setChecked}
          stop_loss={stopLossData?.stop_loss}
          take_profit={stopLossData?.take_profit}
          total={Number(inputValues?.total)}
          quantity={
            Store.getState().chartData.amountType === 'USDT'
              ? Number(inputValues.total)
              : Number(inputValues.amount)
          }
          setInputValues={() => {
            setInputValues((prev) => ({...prev, amount: '0', price: '0'}))
          }}
        />
      </div>

      <Divider className="!bg-chart-secondary-bg-color !my-3" />

      <CheckBoxInputContainer
        checked={checked}
        className="checkbox-checked-bg !appearance-none"
        singleLineContent={English.E298}
        onChange={() => {
          setChecked((prev) => !prev)
        }}
      />

      {checked && <Divider className="!bg-chart-secondary-bg-color !my-1" />}

      {checked && (
        <div className="flex flex-col max-w-[350px]">
          <StopLoss
            heading="Stop Loss"
            marketPrice={Number(inputValues.price)}
            quantity={Number(inputValues?.amount)}
            subHeading="Stop loss"
            setStopLoss={(value) =>
              setStopLossData((prev) => {
                const updated = [...(prev.stop_loss ?? [])]

                updated[0] = {
                  ...updated[0],
                  ...value.stop_loss?.[0],
                  quantity: Number(inputValues.amount),
                }

                return {
                  ...prev,
                  stop_loss: updated,
                }
              })
            }
          />
          <StopLoss
            heading="Take Profit"
            marketPrice={Number(inputValues.price)}
            quantity={Number(inputValues?.amount)}
            subHeading="Take Profit "
            setStopLoss={(value) =>
              setStopLossData((prev) => {
                const updated = [...(prev?.take_profit ?? [])]

                updated[0] = {
                  ...updated[0],
                  ...value?.take_profit?.[0],
                  quantity: Number(inputValues.amount),
                }

                return {
                  ...prev,
                  take_profit: updated,
                }
              })
            }
          />
        </div>
      )}

      {Array.from({length: 2}).map((_, index) => (
        <Fragment key={index}>
          <Divider className="!bg-chart-secondary-bg-color !my-3" />

          <MaxOpenAndMargin
            totalNum={Number(inputValues?.total)}
            totalStr={inputValues?.total}
            type={index === 0 ? 'max_open' : 'margin'}
          />
        </Fragment>
      ))}
    </div>
  )
}

export default memo(BuySell)
