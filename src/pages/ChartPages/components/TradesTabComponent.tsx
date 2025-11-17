import {Fragment, useMemo} from 'react'

import {ImageComponent} from '@/components'
import {Constants, English, Images, Utility} from '@/helpers'
import {ChartObjectProps, ChartSwitchProps} from '@/types/ChartTypes'

const TradesTabComponent = (
  props: Pick<ChartSwitchProps, 'activeType'> & Pick<ChartObjectProps, 'close'>
) => {
  const {activeType, close} = props
  const tradesToMap = useMemo(() => {
    const buyOrders = Constants.OrderBook?.filter(
      (item) => item?.type === 'buy'
    )
    const sellOrders = Constants.OrderBook?.filter(
      (item) => item?.type === 'sell'
    )
    return activeType === 'buy_sell_type'
      ? Constants.OrderBook
      : activeType === 'buy_type'
        ? buyOrders
        : sellOrders
  }, [activeType])
  const maxNumber = Constants.OrderBook?.map(
    (numbers) => numbers.amount * (numbers?.price ? numbers.price : 0)
  ).reduce(
    (accumulator, currentValue) => Math.max(accumulator, currentValue),
    -Infinity
  )

  const indexToShowStats = useMemo(
    () => tradesToMap.length / 2,
    [tradesToMap?.length]
  )

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 px-4">
        {[
          `${English.E140} (${English.E60})`,
          `${English.E141} (BTC)`,
          English.E133,
        ].map((item) => (
          <div key={item} className="flex flex-col gap-1">
            <span className="text-xs font-semibold !leading-5 text-neutral-primary-color text-center">
              {item}
            </span>
          </div>
        ))}
      </div>
      {tradesToMap?.map((trade, tradeIndex) => {
        const {amount, price, type} = trade
        const finalAmount = amount * price
        return (
          <Fragment key={`trade_${trade?.type}_${tradeIndex?.toString()}`}>
            {activeType === 'buy_sell_type' &&
              tradeIndex === indexToShowStats && (
                <div
                  className={`text-chart-green-color my-6 font-medium text-base !leading-6 flex gap-2 items-center justify-center ${price > close ? 'text-chart-green-color' : 'text-chart-red-color'}`}
                >
                  {Utility.numberConversion(price)}{' '}
                  <ImageComponent
                    className={`w-[9px] ${price > close ? 'green_filter' : 'red_filter rotate-180'} `}
                    imageUrl={Images.sharpArrow}
                  />
                  <span className="!text-chart-text-primary-color">
                    {Utility.numberConversion(close)}
                  </span>
                </div>
              )}
            <div className="relative grid grid-cols-3 gap-2 last:mb-0 mb-2 mt-2 *:text-neutral-tertiary-color *:text-xs *:!leading-5 *:text-center py-1">
              <div
                className={`absolute right-0 h-full ${type === 'buy' ? 'bg-chart-green-color' : 'bg-chart-red-color'} opacity-15`}
                style={{
                  width: `${finalAmount > maxNumber ? 100 : (finalAmount / maxNumber) * 100}%`,
                }}
              />
              <span
                className={`font-semibold ${type !== 'buy' ? '!text-chart-red-color' : '!text-chart-green-color'}`}
              >
                {Utility.numberConversion(price)}
              </span>
              <span>{amount}</span>
              <span>{Utility.numberConversion(finalAmount)}</span>
            </div>
          </Fragment>
        )
      })}
    </div>
  )
}

export default TradesTabComponent
