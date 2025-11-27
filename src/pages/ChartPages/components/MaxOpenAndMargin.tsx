import {useEffect, useState} from 'react'

import {useSocketProvider} from '@/GlobalProvider/SocketProvider'
import {English, SocketEmitter, Utility} from '@/helpers'
import {
  MarginAndAssetProps,
  MaxOpenAndMarginProps,
} from '@/types/ComponentTypes'

import {useChartProvider} from '../context/ChartProvider'

const MaxOpenAndMargin = (props: MaxOpenAndMarginProps) => {
  const {type = 'max_open', totalNum, totalStr} = props

  const [marginAssetData, setMarginAssetData] =
    useState<MarginAndAssetProps | null>(null)

  const {socketRef} = useSocketProvider()
  const {challengeId, isLoadingCandles} = useChartProvider()
  const {getChallengeByIdArray} = useChartProvider()

  useEffect(() => {
    const currentSocket = socketRef.current
    if (isLoadingCandles || !currentSocket) return
    currentSocket.on(SocketEmitter.margin_asset + challengeId, (data) => {
      setMarginAssetData(data?.data)
    })
  }, [challengeId, isLoadingCandles, socketRef])
  return (
    <div className="font-normal">
      <div
        className={
          type === 'margin'
            ? 'block w-full space-y-4'
            : 'flex flex-row justify-between'
        }
      >
        {Array.from({length: type === 'margin' ? 2 : 1}).map((_, index) => (
          <div
            key={index}
            className={
              type === 'margin' ? 'block w-full' : 'flex flex-col w-full'
            }
          >
            {/* //heading */}
            {type === 'margin' && (
              <div className="text-base leading-[32px] mb-2 font-bold">
                {index === 0 ? English.E319 : English.E320}
              </div>
            )}
            <div className="flex flex-col gap-1 mb-2 sm:flex-row sm:justify-between sm:items-center">
              <span className="text-chart-text-primary-color/40 text-sm leading-[20px]">
                {type === 'margin'
                  ? index === 0
                    ? English.E326
                    : English.E323
                  : English.E317}
              </span>
              <span className="font-medium">
                {type === 'margin'
                  ? index === 0
                    ? Utility.removeDecimal(
                        marginAssetData?.available_margin ??
                          getChallengeByIdArray[0]?.current_usdt ??
                          0,
                        2
                      )
                    : Utility.removeDecimal(
                        marginAssetData?.total_balance ??
                          getChallengeByIdArray[0]?.current_usdt ??
                          0,
                        2
                      )
                  : Utility.numberConversion(
                      getChallengeByIdArray[0]?.current_usdt ?? 0
                    )}{' '}
                {English.E60}
              </span>
            </div>

            <div className="flex flex-col gap-1 mb-2 sm:flex-row sm:justify-between sm:items-center">
              <span className="text-chart-text-primary-color/40 text-sm">
                {type === 'margin'
                  ? index === 0
                    ? English.E327
                    : English.E324
                  : English.E318}
              </span>
              <span className="font-medium">
                {type === 'margin'
                  ? index === 0
                    ? Utility.removeDecimal(
                        marginAssetData?.used_margin ?? 0,
                        2
                      )
                    : Utility.removeDecimal(
                        marginAssetData?.account_balance ??
                          getChallengeByIdArray[0]?.current_usdt ??
                          0,
                        2
                      )
                  : totalNum > 1
                    ? totalStr
                    : Utility.removeDecimal(totalNum, 2)}{' '}
                {English.E60}
              </span>
            </div>

            {type === 'margin' && index === 1 && (
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-center">
                <span className="text-chart-text-primary-color/40 text-sm">
                  {English.E325}
                </span>

                <div className="flex flex-col gap-1">
                  <span
                    className={`font-medium ${marginAssetData?.unreleased_profit?.toString().startsWith('-') ? 'text-light-danger-color ' : 'text-light-success-color '}`}
                  >
                    {Utility.removeDecimal(
                      marginAssetData?.unreleased_profit ?? 0,
                      2
                    ) ?? '0.00'}{' '}
                    {English.E60}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MaxOpenAndMargin
