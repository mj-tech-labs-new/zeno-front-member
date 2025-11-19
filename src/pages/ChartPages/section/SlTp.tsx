import {memo, useCallback, useRef, useState} from 'react'

import {CommonButton, InputContainer, RangeSelector} from '@/components'
import {English} from '@/helpers'
import {CommonStopLossProp} from '@/types/ChartTypes'

import {useChartProvider} from '../context/ChartProvider'

interface StopLoss {
  marketprice: number
  quantity: number
  persantageValue?: number
  rangeValue?: number
}

const SlTp = (props: CommonStopLossProp) => {
  const {
    heading = '',
    subHeading = '',
    marketPrice,
    closingQuantity,
    BuyOrSellType = 'buy',
    setSlMarketPrice,
  } = props

  const [error, setError] = useState('')

  const [inputValues, setInputValues] = useState<StopLoss[]>([])
  const {chartInfo} = useChartProvider()
  const stRef = useRef<number>(0)

  const handleInputChange = useCallback(
    (name: keyof StopLoss, value: string) => {
      setInputValues((prev) => {
        const updated = [...prev]
        const currentObject = updated[stRef.current - 1]

        const newItem = {
          ...currentObject,
          rangeValue:
            name === 'quantity'
              ? (Number(value) / Number(closingQuantity)) * 100
              : name === 'rangeValue'
                ? Number(value)
                : currentObject.rangeValue,

          quantity:
            name === 'quantity'
              ? Number(value)
              : name === 'rangeValue'
                ? (Number(value) / 100) * Number(closingQuantity)
                : currentObject.quantity,
        }

        if (name === 'marketprice' && BuyOrSellType === 'buy') {
          const isInvalid = Number(value) > Number(marketPrice)
          if (isInvalid) {
            setError('Market Price must be less than Entry Price')
          } else {
            setError('')
          }
          setSlMarketPrice(Number(value))
          newItem.marketprice = Number(value)
        }
        if (name === 'marketprice' && BuyOrSellType === 'sell') {
          const isInvalid = Number(value) > Number(marketPrice)

          if (isInvalid) {
            setError('Market Price must be Grater than Entry Price')
          } else {
            setError('')
          }
          setSlMarketPrice(Number(value))
          newItem.marketprice = Number(value)
        }

        if (name === 'marketprice' && BuyOrSellType !== 'buy') {
          newItem.marketprice = Number(value)
        }

        updated[stRef.current - 1] = newItem
        return updated
      })
    },
    [BuyOrSellType, closingQuantity, marketPrice, setSlMarketPrice]
  )

  const handleSl = useCallback(
    (type: string, index?: number) => {
      if (type === 'add') {
        stRef.current += 1
        setInputValues((prev) => [
          ...prev,
          {
            marketprice: 0,
            quantity: closingQuantity ?? 0,
            persantageValue: 100,
            rangeValue: 100,
          },
        ])
      }

      if (type === 'remove' && index !== undefined) {
        stRef.current -= 1
        setInputValues((prev) => prev.filter((_, i) => i !== index))
      }
    },
    [closingQuantity]
  )

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between gap-2 w-full items-center mt-3 mx-0.5">
          <div className="flex gap-3">
            <div className="text-base !leading-8 text-chart-text-primary-color font-semibold">
              {heading}{' '}
            </div>
            <div>
              <CommonButton
                className="bg-primary-dark-blue-color rounded-md !text-xl font-normal !px-2 !py-0.5 "
                singleLineContent="+"
                onClick={() => {
                  handleSl('add')
                }}
              />
            </div>
          </div>
        </div>
        <div>
          {inputValues.map((inputItem, index) => (
            <div
              key={`SLTP_${index.toString()}`}
              className="mb-10 flex flex-col gap-3"
            >
              <div className="flex justify-between ">
                <div className="text-lg mb-2.5 font-normal  ">
                  {subHeading}
                  {index + 1}
                </div>
                <div>
                  <CommonButton
                    className="bg-dark-danger-color rounded-md !text-xl font-normal !px-2 !py-0.5 "
                    onClick={() => handleSl('remove', index)}
                    singleLineContent="X"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="px-4 py-3 rounded-xl border-2 border-solid border-neutral-secondary-color">
                  <div className="flex justify-between gap-2">
                    <span className="shrink-0 text-light-neutral-color text-sm !leading-6 font-medium capitalize">
                      {English.E293}
                    </span>

                    <div className="w-full gap-2.5 flex items-center">
                      <div>
                        <InputContainer
                          error={error}
                          layoutClassName="!w-full"
                          className="!p-0 !border-none !w-full [&>input]:!text-end [&>input]:!h-6
[&>input]:!text-chart-text-primary-color [&>input]:!text-sm 
[&>input]:placeholder:!text-chart-text-primary-color 
[&>input]:!w-full !leading-6 !font-medium"
                          onChange={(e) =>
                            handleInputChange('marketprice', e.target.value)
                          }
                          value={
                            inputItem?.marketprice?.toString() ?? marketPrice
                          }
                        />
                      </div>

                      <div className="w-[1px] bg-primary-dark-blue-color h-full" />

                      <span className="text-neutral-primary-color font-medium text-sm !leading-6">
                        {English.E60}
                      </span>
                    </div>
                  </div>
                </div>
                {error && (
                  <span className="text-light-danger-color text-xs/6 font-normal mx-1.5">
                    {error}
                  </span>
                )}

                <div className="px-4 py-3 rounded-xl border-2 border-solid border-neutral-secondary-color">
                  <div className="flex justify-between gap-2">
                    <span className="shrink-0 text-light-neutral-color text-sm !leading-6 font-medium capitalize">
                      {English.E294}
                    </span>

                    <div className="w-full gap-2.5 flex items-center">
                      <InputContainer
                        layoutClassName="!w-full"
                        value={inputItem.quantity.toString()}
                        className="!p-0 !border-none !w-full [&>input]:!text-end [&>input]:!h-6
  [&>input]:!text-chart-text-primary-color [&>input]:!text-sm 
  [&>input]:placeholder:!text-chart-text-primary-color 
  [&>input]:!w-full !leading-6 !font-medium"
                        onChange={(e) =>
                          handleInputChange('quantity', e.target.value)
                        }
                      />
                      <div className="w-[1px] bg-primary-dark-blue-color h-full" />
                      <span className="text-neutral-primary-color font-medium text-sm !leading-6">
                        {chartInfo?.fullSymbolName.replace('USDT', '')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <RangeSelector
                  className="mt-3 mb-4"
                  rangeClassname="bg-yellow-500"
                  rangeValue={inputValues?.[index]?.rangeValue ?? 0}
                  setRangeValue={(value) => {
                    handleInputChange('rangeValue', value.toString())
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default memo(SlTp)
