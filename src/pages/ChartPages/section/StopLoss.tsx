import { memo, useCallback, useEffect, useRef, useState } from 'react'

import { InputContainer } from '@/components'
import { English, Utility } from '@/helpers'
import { CommonStopLossProp, StopLossProps } from '@/types/ChartTypes'

const StopLoss = (props: CommonStopLossProp) => {
  const { heading = '', marketPrice, setStopLoss, quantity = 0, stopLoss } = props

  const [inputValues, setInputValues] = useState<StopLossProps[]>([])
  const stopLossRef = useRef<number>(0)

  const handleInputChange = useCallback(
    (name: keyof StopLossProps, value: string) => {
      setInputValues((prev) => {
        const updated = prev.map((item) => ({
          ...item,
          [name]: value,
        }))

        const payload = updated.map((item) => ({
          id: 1,
          price: Utility.validPointValue(item.marketprice),
          status: item.status ?? 'unused',
        }))


        setStopLoss({ take_profit: payload?.[0]?.price === '0' ? [] : payload, stop_loss: payload?.[0]?.price === '0' ? [] : payload })
        return updated
      })
    },
    [setStopLoss]
  )

  useEffect(() => {
    if (stopLossRef.current >= 1) return
    stopLossRef.current += 1
    setInputValues((prev) => [
      ...prev,
      {
        id: 1,
        marketprice: '0',
        status: 'unused',
      },
    ])
  }, [])

  useEffect(() => {
    if (!stopLoss || !quantity) {
      setInputValues([
        {
          id: 0,
          marketprice: '0',
        },
      ])
      return
    }
    setInputValues(() => [
      {
        id: stopLoss?.id,
        marketprice: stopLoss?.price?.toString(),
        quantity,
        status: 'unused',
      },
    ])
  }, [quantity, stopLoss])
  return (
    <div className="!w-fit">
      <div className="flex flex-col gap-1">
        <div className="flex justify-between gap-2 w-full items-center mt-3 mx-0.5">
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-primary-color text-sm font-switzer!">
              {heading}{' '}
            </div>
          </div>
        </div>
        <div>
          {inputValues.map((inputItem, index) => (
            <div
              key={`SLTP_${index.toString()}`}
              className=" flex flex-col gap-3"
            >
              <div className="flex flex-col gap-3">
                <div className="px-4 py-1.5 rounded-xl border-2 border-solid border-neutral-secondary-color">
                  <div className="flex justify-between gap-2">
                    <div className="w-fit gap-2.5 flex justify-between items-center">
                      <InputContainer
                        layoutClassName="!w-fit"
                        placeholder={English.E6.replace('password', '')}
                        readOnly={!marketPrice || !quantity}
                        className="!p-0 !border-none !w-full [&>input]:text-start! [&>input]:!h-fit
                [&>input]:!text-chart-text-primary-color [&>input]:placeholder:text-sm [&>input]:px-0! [&>input]:placeholder:!text-chart-text-primary-color [&>input]:!w-full !leading-6 !font-medium [&>input]:text-base"
                        onChange={(e) =>
                          handleInputChange('marketprice', e.target.value)
                        }
                        value={
                          inputItem?.marketprice?.toString() ?? marketPrice
                        }
                      />

                      <div className="w-[1px] bg-primary-dark-blue-color h-full" />

                      <span className="text-neutral-primary-color font-medium text-sm !leading-6 !w-fit">
                        {English.E60}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default memo(StopLoss)
