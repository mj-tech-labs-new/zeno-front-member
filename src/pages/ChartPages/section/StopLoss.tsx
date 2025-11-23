import {memo, useCallback, useEffect, useRef, useState} from 'react'

import {InputContainer} from '@/components'
import {English} from '@/helpers'
import {CommonStopLossProp, StopLossProps} from '@/types/ChartTypes'

const StopLoss = (props: CommonStopLossProp) => {
  const {heading = '', marketPrice, setStopLoss} = props

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
          id: item.id,
          price: Number(item.marketprice),
          status: item.status,
        }))

        setStopLoss({take_profit: payload, stop_loss: payload})
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
        id: 0 + 1,
        marketprice: 0,
        status: 'unused',
      },
    ])
  }, [])

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between gap-2 w-full items-center mt-3 mx-0.5">
          <div className="flex gap-3">
            <div className="text-base !leading-8 text-chart-text-primary-color font-semibold">
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
                <div className="px-4 py-3 rounded-xl border-2 border-solid border-neutral-secondary-color">
                  <div className="flex justify-between gap-2">
                    <span className="shrink-0 text-light-neutral-color text-sm !leading-6 font-medium capitalize">
                      {English.E293}
                    </span>

                    <div className="w-full gap-2.5 flex items-center">
                      <div>
                        <InputContainer
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default memo(StopLoss)
