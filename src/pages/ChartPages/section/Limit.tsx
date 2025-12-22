/* eslint-disable prefer-template */
import {Fragment, memo, useCallback, useEffect, useRef, useState} from 'react'

import {Divider, ImageComponent, InputContainer} from '@/components'
import CheckBoxInputContainer from '@/components/InputContainer/CheckBoxInputContainer'
import {Constants, English, Images, Utility} from '@/helpers'
import {BuyOrSelProps, CommonBuyAndSellProp} from '@/types/ChartTypes'

import MaxOpenAndMargin from '../components/MaxOpenAndMargin'
import {useChartProvider} from '../context/ChartProvider'
import ActionButton from './ActionButton'
import StopLoss from './StopLoss'

const Limit = (props: BuyOrSelProps) => {
  const {activeIndex, margin_mode} = props
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
  const [total, setTotal] = useState(0)

  const [stopLossData, setStopLossData] = useState<
    Pick<CommonBuyAndSellProp, 'stop_loss'> &
      Pick<CommonBuyAndSellProp, 'take_profit'>
  >({stop_loss: [], take_profit: []})
  const [stopLossValue, setStopLossValue] = useState<number>(0)
  const totalStrFinal = useRef<string>('')

  useEffect(() => {
    setInputValues({
      entryprice: '',
      quantity: '',
    })
  }, [selectedLeverage])

  useEffect(() => {
    const entryPriceStr = inputValues?.entryprice
    const entryPriceBigInt = entryPriceStr.includes('.')
      ? BigInt(entryPriceStr.replace('.', ''))
      : BigInt(entryPriceStr)
    const quantityStr = inputValues?.quantity ?? '0'
    const quantityBigInt = quantityStr.includes('.')
      ? BigInt(quantityStr?.replace('.', '') ?? '0')
      : BigInt(quantityStr ?? '0')
    const leverageBigInt = BigInt(
      selectedLeverage?.title.toString().replace('X', ' ') ?? 1
    )
    const totalStr = (
      (entryPriceBigInt * quantityBigInt) /
      leverageBigInt
    ).toString()

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
    selectedLeverage?.title,
    selectedToken,
    tokenList,
  ])

  const handleLeverageCount = useCallback(
    (price: number | string) => {
      if (!selectedLeverage?.title || !price) return
      const leverage = Number()

      const entry = Number(price)

      const leveragedPrice = entry / leverage

      setInputValues((prev) => ({
        ...prev,
        entryprice: leveragedPrice.toString(),
      }))
    },
    [selectedLeverage]
  )

  const handleInputChange = useCallback(
    (name: keyof typeof inputValues, value: string) => {
      setInputValues((prev) => {
        if (name === 'entryprice' && getChallengeByIdArray) {
          return {
            ...prev,
            entryprice: Utility.validFloatNumber(
              Utility.validPointValue(value)
            ),
          }
        }

        return {
          ...prev,
          quantity: Utility.validFloatNumber(Utility.validPointValue(value)),
        }
      })
    },
    [getChallengeByIdArray]
  )

  useEffect(() => {
    if (!inputValues?.entryprice) setTotal(0)
    if (!inputValues?.quantity) setTotal(0)
    if (
      inputValues?.entryprice != null &&
      inputValues?.entryprice !== '' &&
      inputValues?.quantity != null &&
      inputValues?.quantity !== ''
    ) {
      setTotal(
        (parseFloat(inputValues?.entryprice) *
          parseFloat(inputValues?.quantity)) /
          Number(selectedLeverage?.title)
      )
    }
  }, [getChallengeByIdArray, inputValues, selectedLeverage?.title, total])

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

      {Constants.BuySellInputArray.Limit.map((item, index) => {
        const {name, label, textContent} = item
        const priceValue = inputValues?.[name as keyof typeof inputValues]
        return (
          <div key={`name_${name}`}>
            <div className="px-4 py-3 rounded-xl border-2 border-solid border-neutral-secondary-color">
              <div className="flex justify-between gap-2">
                <div className="w-full gap-2.5 flex items-center">
                  <InputContainer
                    layoutClassName="!w-full"
                    placeholder={label}
                    value={priceValue}
                    className="!p-0 !border-none !w-full [&>input]:!text-end [&>input]:!h-6
              [&>input]:!text-chart-text-primary-color [&>input]:!text-sm [&>input]:placeholder:!text-chart-text-primary-color [&>input]:!w-full !leading-6 !font-medium"
                    onChange={(e) => {
                      if (name === 'entryprice') {
                        const {value} = e.target
                        handleLeverageCount(value)
                      }
                      handleInputChange(
                        name as keyof typeof inputValues,
                        e.target.value
                      )
                    }}
                  />

                  <div className="w-[1px] bg-primary-dark-blue-color h-full" />
                  <span className="text-neutral-primary-color font-medium text-sm !leading-6">
                    {index === 0 && textContent}
                    {index === 1 && chartInfo?.fullSymbolName.split('USDT')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
      {total && total > getChallengeByIdArray?.[0]?.current_usdt ? (
        <span className="text-light-danger-color text-xs/6 font-normal tracking-[0.4px]">
          {English.E279}
        </span>
      ) : null}
      <div className="flex items-center gap-3">
        <ActionButton
          activeIndex={activeIndex}
          checked={checked}
          leverage={Number(selectedLeverage?.title.replace('X', ' '))}
          margin_mode={margin_mode}
          order_type="limit"
          price={Number(inputValues?.entryprice)}
          setChecked={setChecked}
          stop_loss={stopLossData?.stop_loss}
          take_profit={stopLossData?.take_profit}
          total={total}
          quantity={Number(
            Utility.removeDecimal(Number(inputValues?.quantity))
          )}
          setInputValues={() => {
            setInputValues({entryprice: '0', quantity: '0'})
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

      {Array.from({length: 2}).map((_, index) => (
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
