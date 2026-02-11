
import { toNumber } from 'lodash'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { Divider, ImageComponent } from '@/components'
import CommonPriceSwitch from '@/components/CommonPriceSwitch/CommonPriceSwitch'
import CheckBoxInputContainer from '@/components/InputContainer/CheckBoxInputContainer'
import { Constants, English, Images, Utility } from '@/helpers'
import { BuyOrSelProps, CommonBuyAndSellProp } from '@/types/ChartTypes'
import { StorageProps } from '@/types/CommonTypes'

import MaxOpenAndMargin from '../components/MaxOpenAndMargin'
import { useChartProvider } from '../context/ChartProvider'
import ActionButton from './ActionButton'
import StopLoss from './StopLoss'

const Limit = (props: BuyOrSelProps) => {
  const { activeIndex, margin_mode } = props
  const {
    selectedToken,
    getChallengeByIdArray,
    livePrice,
    selectedLeverage,
    isTpSl,
    setIsTpSl,
  } = useChartProvider()

  const [inputValues, setInputValues] = useState({
    entryprice: '',
    quantity: '',
  })

  const chartData = useSelector((state: StorageProps) => state.chartData)
  const [amountPriceType, setAmountPriceType] = useState(chartData?.amountType)
  const [total, setTotal] = useState(0)

  const [stopLossData, setStopLossData] = useState<
    Pick<CommonBuyAndSellProp, 'stop_loss'> &
    Pick<CommonBuyAndSellProp, 'take_profit'>
  >({ stop_loss: [], take_profit: [] })

  const [stopLossValue, setStopLossValue] = useState(0)

  const totalStrFinal = useRef<string>('')

  const tokenQtyRef = useRef('0')

  const addAmountType = useSelector(
    (state: StorageProps) => state?.chartData?.amountType
  )


  const resetValues = useCallback(() => {
    setInputValues({ entryprice: '', quantity: '' })
    setStopLossValue(0)
    setStopLossData({ stop_loss: [], take_profit: [] })
    totalStrFinal.current = ''
    tokenQtyRef.current = '0'
  }, [])


  const handleLeverageCount = useCallback(
    (value: string) => {
      if (!selectedLeverage?.title) return

      const cleanValue = Utility.validFloatNumber(
        Utility.validPointValue(value)
      )

      setInputValues((prev) => ({
        ...prev,
        entryprice: cleanValue,
      }))
    },
    [selectedLeverage]
  )

  const handleInputChange = useCallback(
    (value: string) => {
      setInputValues((prev) => {
        let tokenValue = ''

        if (addAmountType === '' || addAmountType !== 'USDT') {
          tokenValue = Utility.validFloatNumber(
            Utility.validPointValue(value)
          )
          tokenQtyRef.current = tokenValue
        } else {
          tokenValue = Utility.validFloatNumber(
            Utility.validFloatNumber(value)
          )

          const price = Number(prev.entryprice || 1)
          const qty = price ? toNumber(tokenValue) / price : 0
          tokenQtyRef.current = qty.toString()
        }

        return { ...prev, quantity: tokenValue }
      })
    },
    [addAmountType]
  )

  useEffect(() => {
    if (!selectedLeverage || !selectedToken) return
    resetValues()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLeverage, selectedToken, activeIndex])

  useEffect(() => {
    if (activeIndex === 1) {
      setInputValues((prev) => ({
        ...prev,
        entryprice: livePrice.toString(),
      }))
      return
    }

    const priceStr = inputValues.entryprice
    const qtyStr = inputValues.quantity

    if (
      !Utility.isValidNumberString(priceStr) ||
      !Utility.isValidNumberString(qtyStr)
    ) {
      totalStrFinal.current = ''
      return
    }

    const totalValue = Number(priceStr) * Number(qtyStr)
    totalStrFinal.current = Utility.removeDecimal(totalValue, 2)
  }, [
    inputValues.entryprice,
    inputValues.quantity,
    livePrice,
    activeIndex,
  ])

  useEffect(() => {
    if (!inputValues.quantity) {
      setTotal(0)
      return
    }

    if (getChallengeByIdArray?.[0]) {
      const price = Number(inputValues.entryprice || 1)
      const qty = Number(tokenQtyRef.current || 0)

      const fee =
        (qty * price * getChallengeByIdArray[0].order_fee_percent) / 100

      const finalAmount = Utility.removeDecimal(fee + qty * price)
      setTotal(Number(finalAmount))
    }
  }, [
    getChallengeByIdArray,
    inputValues.entryprice,
    inputValues.quantity,
    livePrice,
  ])

  useEffect(() => {
    setAmountPriceType(chartData?.selectedToken?.name ?? 'BTC')
  }, [chartData?.selectedToken?.name])


  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold">
          {English.E130}
        </span>
        <span className="flex items-center gap-1">
          {Utility.numberConversion(
            getChallengeByIdArray?.[0]?.current_usdt ?? 0
          )}{' '}
          {English.E60}
          <ImageComponent className="!w-4" imageUrl={Images.walletImg} />
        </span>
      </div>

      {Constants.BuySellInputArray[
        activeIndex === 0 ? 'Limit' : 'Market'
      ]?.map((item, index) => {
        const { name, label, placeHolder } = item

        const value =
          name === 'price'
            ? livePrice
            : inputValues[name as keyof typeof inputValues]

        return (
          <CommonPriceSwitch
            key={name}
            currentIndex={index}
            currentPriceType={amountPriceType ?? 'USDT'}
            disabled={name === 'price'}
            name={name}
            onModelClose={resetValues}
            placeholder={placeHolder}
            showModelType={index === 1 || index === 2}
            singleLineContent={label}
            value={value || ''}
            onChange={(e) => {
              if (name === 'entryprice') {
                handleLeverageCount(e.target.value)
              } else {
                handleInputChange(e.target.value)
              }
            }}
          />
        )
      })}

      {total > getChallengeByIdArray?.[0]?.current_usdt && (
        <span className="text-light-danger-color text-xs">
          {English.E279}
        </span>
      )}

      <Divider className="!bg-chart-secondary-bg-color !my-3" />

      <CheckBoxInputContainer
        checked={isTpSl}
        className="checkbox-checked-bg !appearance-none"
        singleLineContent={English.E298}
        onChange={() => {
          setIsTpSl((prev) => {
            if (prev) {
              setStopLossData({ stop_loss: [], take_profit: [] })
            }
            return !prev
          })
        }}
      />
      {isTpSl && <Divider className="!bg-chart-secondary-bg-color !my-1" />}
      {isTpSl && (
        <div className="flex flex-col ">
          <StopLoss
            heading="Stop Loss"
            marketPrice={Number(inputValues.entryprice)}
            quantity={Number(inputValues.quantity)}
            resetValue={stopLossValue}
            setStopLoss={(value) =>
              setStopLossData((prev) => ({
                ...prev,
                stop_loss: value.stop_loss ?? [],
              }))
            }
          />
          <StopLoss
            heading="Take Profit"
            marketPrice={Number(inputValues.entryprice)}
            quantity={Number(inputValues.quantity)}
            resetValue={stopLossValue}
            setStopLoss={(value) =>
              setStopLossData((prev) => ({
                ...prev,
                take_profit: value.take_profit ?? [],
              }))
            }
          />
        </div>
      )}

      <Divider className="!bg-chart-secondary-bg-color !my-3" />


      <MaxOpenAndMargin
        totalNum={total}
        totalStr={total.toString()}
        type="max_open"
      />

      <ActionButton
        checked={isTpSl}
        leverage={Number(selectedLeverage?.title.replace('X', ''))}
        margin_mode={margin_mode}
        order_type={activeIndex === 0 ? 'limit' : 'market'}
        quantity={Number(tokenQtyRef.current)}
        setChecked={setIsTpSl}
        setInputValues={resetValues}
        stop_loss={stopLossData.stop_loss}
        take_profit={stopLossData.take_profit}
        total={total}
        price={
          activeIndex === 0
            ? Number(inputValues.entryprice)
            : livePrice
        }
      />

      <Divider className="!bg-chart-secondary-bg-color !mb-3" />


      <MaxOpenAndMargin
        totalNum={total}
        totalStr={total.toString()}
        type="margin"
      />
    </div>
  )
}

export default memo(Limit)
