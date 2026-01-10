/* eslint-disable prefer-template */
import { toNumber } from 'lodash'
import { Fragment, memo, useCallback, useEffect, useRef, useState } from 'react'
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
    tokenList,
    getChallengeByIdArray,
    chartInfo,
    livePrice,
    selectedLeverage,
  } = useChartProvider()
  const [checked, setChecked] = useState(false)
  const [inputValues, setInputValues] = useState({
    entryprice: '',
    quantity: '',
  })
  const [amountPriceType, setAmountPriceType] = useState('')
  const [total, setTotal] = useState(0)
  const [stopLossData, setStopLossData] = useState<
    Pick<CommonBuyAndSellProp, 'stop_loss'> &
    Pick<CommonBuyAndSellProp, 'take_profit'>
  >({ stop_loss: [], take_profit: [] })
  const [stopLossValue, setStopLossValue] = useState<number>(0)
  const totalStrFinal = useRef<string>('')
  const tokenQtyRef = useRef('0')
  const addAmountType = useSelector(
    (state: StorageProps) => state?.chartData?.amountType
  )
  // const [rangeValue, setRangeValue] = useState(0)

  const resetValues = useCallback(() => {
    setInputValues({
      entryprice: '',
      quantity: '',
    })
    totalStrFinal.current = ''
    tokenQtyRef.current = '0'
  }, [])

  const handleLeverageCount = useCallback(
    (price: number | string) => {
      if (!selectedLeverage?.title || !price) {
        setInputValues((prev) => ({
          ...prev,
          entryprice: '',
        }))
        return
      }
      const entry = toNumber(price)
      setInputValues((prev) => ({
        ...prev,
        entryprice: entry.toString(),
      }))
    },
    [selectedLeverage]
  )

  const handleInputChange = useCallback(
    (value: string) => {
      setInputValues((prev) => {
        let tokenValue = ''
        if (addAmountType === '' || addAmountType !== 'USDT') {
          tokenValue = Utility.validFloatNumber(Utility.validPointValue(value))
          tokenQtyRef.current = tokenValue
        } else {
          tokenValue = Utility.validFloatNumber(Utility.validFloatNumber(value))
          const entityToDivide = toNumber(prev.entryprice) ?? 1
          const qty = toNumber(tokenValue) / entityToDivide
          tokenQtyRef.current = qty.toString()
        }
        return {
          ...prev,
          quantity: tokenValue,
        }
      })
    },
    [addAmountType]
  )

  useEffect(() => {
    if (!selectedLeverage || !selectedToken) return
    resetValues()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLeverage, selectedToken])

  useEffect(() => {
    if (activeIndex === 1) {
      setInputValues((prev) => ({ ...prev, entryprice: livePrice.toString() }))
      return
    }
    const entryPriceStr = inputValues?.entryprice
    const entryPriceBigInt = entryPriceStr.includes('.')
      ? BigInt(entryPriceStr.replace('.', ''))
      : BigInt(entryPriceStr)
    const quantityStr = inputValues?.quantity ?? '0'
    const quantityBigInt = quantityStr.includes('.')
      ? BigInt(quantityStr?.replace('.', '') ?? '0')
      : BigInt(quantityStr ?? '0')
    const totalStr = (entryPriceBigInt * quantityBigInt).toString()

    if (!entryPriceStr.includes('.') && !quantityStr.includes('.')) {
      totalStrFinal.current = totalStr // for int
    } else {
      const decimalPlacesPrice = entryPriceStr.includes('.')
        ? entryPriceStr.length - entryPriceStr.indexOf('.') - 1
        : 0
      const decimalPlacesAmount = quantityStr.includes('.')
        ? quantityStr.length - quantityStr.indexOf('.') - 1
        : 0

      const indexTotal =
        totalStr.length - (decimalPlacesPrice + decimalPlacesAmount)

      const totalStrPrecise =
        totalStr.slice(0, indexTotal) +
        '.' +
        totalStr.slice(indexTotal, indexTotal + 2)

      totalStrFinal.current = totalStrPrecise // for float
    }
  }, [
    inputValues.entryprice,
    inputValues.quantity,
    livePrice,
    selectedToken,
    tokenList,
    activeIndex,
  ])

  useEffect(() => {
    if (!inputValues?.quantity) setTotal(0)
    if (
      inputValues?.quantity != null &&
      inputValues?.quantity !== '' &&
      getChallengeByIdArray?.[0]
    ) {
      const feeToAdd =
        (toNumber(tokenQtyRef.current) *
          (toNumber(inputValues.entryprice) ?? 1) *
          getChallengeByIdArray[0].order_fee_percent) /
        100
      const quantityToGet =
        toNumber(tokenQtyRef.current) * (toNumber(inputValues.entryprice) ?? 1)
      // console.log('tokenQtyRef.current', tokenQtyRef.current)
      const finalAmount = Utility.removeDecimal(feeToAdd + quantityToGet)
      // console.log('finalAmount', finalAmount)
      setTotal(toNumber(finalAmount))
    }
  }, [
    getChallengeByIdArray,
    inputValues.entryprice,
    inputValues?.quantity,
    livePrice,
  ])

  useEffect(() => {
    if (!chartInfo?.symbol) return
    setAmountPriceType(chartInfo?.symbol)
  }, [chartInfo?.symbol])

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
      {Constants.BuySellInputArray[activeIndex === 0 ? 'Limit' : 'Market']?.map(
        (item, index) => {
          const { name, label, placeHolder } = item
          const priceValue =
            name === 'price'
              ? livePrice
              : inputValues?.[name as keyof typeof inputValues]
          return (
            <CommonPriceSwitch
              key={`name _${name}`}
              currentIndex={index}
              currentPriceType={amountPriceType}
              disabled={name === 'price'}
              name={name}
              onModelClose={resetValues}
              placeholder={placeHolder}
              showModelType={index === 1 || index === 2}
              singleLineContent={label}
              value={priceValue}

              onChange={(e) => {
                if (name === 'entryprice') {
                  const { value } = e.target
                  handleLeverageCount(value)
                  return
                }
                handleInputChange(e.target.value)
              }}
            />
          )
        }
      )}
      {total && total > getChallengeByIdArray?.[0]?.current_usdt ? (
        <span className="text-light-danger-color text-xs/6 font-normal tracking-[0.4px]">
          {English.E279}
        </span>
      ) : null}
      <div className="flex items-center gap-3">
        <ActionButton
          checked={checked}
          leverage={Number(selectedLeverage?.title.replace('X', ' '))}
          margin_mode={margin_mode}
          order_type="limit"
          quantity={toNumber(tokenQtyRef.current)}
          setChecked={setChecked}
          stop_loss={stopLossData?.stop_loss}
          take_profit={stopLossData?.take_profit}
          total={total}
          price={
            activeIndex === 0 ? Number(inputValues?.entryprice) : livePrice
          }
          setInputValues={() => {
            setInputValues({ entryprice: '0', quantity: '0' })
            setStopLossValue(0)
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
        <div className="flex flex-col ">
          <StopLoss
            heading="Stop Loss"
            marketPrice={Number(inputValues.entryprice)}
            quantity={Number(inputValues.quantity)}
            resetValue={stopLossValue}
            subHeading="Stop loss"
            setStopLoss={(value) =>
              setStopLossData((prev) => {
                const updated = [...(prev.stop_loss ?? [])]

                updated[0] = {
                  ...updated[0],
                  ...value.stop_loss?.[0],
                  quantity: Number(
                    Utility.removeDecimal(Number(inputValues.quantity))
                  ),
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
            marketPrice={Number(inputValues.entryprice)}
            quantity={Number(inputValues.quantity)}
            resetValue={stopLossValue}
            subHeading="Take Profit "
            setStopLoss={(value) =>
              setStopLossData((prev) => {
                const updated = [...(prev?.take_profit ?? [])]

                updated[0] = {
                  ...updated[0],
                  ...value?.take_profit?.[0],
                  quantity: Number(
                    Utility.removeDecimal(Number(inputValues.quantity))
                  ),
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

      {Array.from({ length: 2 }).map((_, index) => (
        <Fragment key={index}>
          <Divider
            className={`!bg-chart-secondary-bg-color ${index === 0 ? '!my-3' : '!mb-3'}`}
          />

          <MaxOpenAndMargin
            totalNum={total}
            totalStr={totalStrFinal?.current}
            type={index === 0 ? 'max_open' : 'margin'}
          />
        </Fragment>
      ))}
    </div>
  )
}

export default memo(Limit)
