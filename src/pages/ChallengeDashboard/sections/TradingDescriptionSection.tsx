import {memo, useEffect, useMemo, useState} from 'react'

import {BasicSkeleton, HeadingComponent, StatsDescription} from '@/components'
import {English, SocketEmitter} from '@/helpers'
import ChallengeCardLayout from '@/layouts/ChallengeDashboardCardLayout'
import {
  ChallengeDataSocketType,
  TradingDescriptionSectionProps,
} from '@/types/ChallengeTypes'

import {useChallengeProvider} from '../context/ChallengeDashboardProvider'

const TradingDescriptionSection = (props: TradingDescriptionSectionProps) => {
  const {type, className, layoutClassName} = props
  const [socketData, setSocketData] = useState<ChallengeDataSocketType>()
  const [isLoadingSocket, setIsLoadingSocket] = useState(true)
  const {
    getChallengeByIdArray,
    tradingStatistics,
    challengeIdRef,
    socketRef,
    showLoader,
  } = useChallengeProvider()

  useEffect(() => {
    if (showLoader || !socketRef.current || !challengeIdRef.current) return
    if (!showLoader) {
      socketRef.current?.on(
        `${SocketEmitter.DashboardEmitter.challenge_dashboard_socket}_${challengeIdRef.current}`,
        (data) => {
          setIsLoadingSocket(false)
          setSocketData(data?.data)
        }
      )
    }
  }, [challengeIdRef, showLoader, socketRef])

  const tradingObjectiveArray = useMemo(
    () => [
      {
        title: English.E66,
        firstValue: getChallengeByIdArray?.[0]?.min_trading_day,
        secondValue: getChallengeByIdArray?.[0]?.trading_day,
      },
      {
        title: English.E68,
        secondValue: socketData?.total_available_profit,
        firstValue: socketData?.profit_target_amount ?? 0,
      },
      {
        title: English.E69,
        secodValue: socketData?.daily_drawdown ?? 0,
        firstValue: socketData?.max_daily_loss_amount ?? 0,
      },
      {
        title: English.E70,
        secodValue: socketData?.max_current_loss,
        firstValue: socketData?.max_total_loss ?? 0,
      },
    ],
    [
      getChallengeByIdArray,
      socketData?.daily_drawdown,
      socketData?.max_current_loss,
      socketData?.max_daily_loss_amount,
      socketData?.max_total_loss,
      socketData?.profit_target_amount,
      socketData?.total_available_profit,
    ]
  )

  const percentageCardsArray = useMemo(() => {
    const initialAmount = getChallengeByIdArray?.[0]?.initial_capital ?? 1
    const releasAmount = getChallengeByIdArray?.[0]?.released_profit
    return [
      {
        title: English.E61,
        firstValue: releasAmount ?? 0,
        secondValue: (Number(releasAmount ?? 0) / (initialAmount ?? 1)) * 100,
      },
      {
        title: English.E62,
        secondValue: socketData?.unreleased_profit_per ?? 0,
        firstValue: socketData?.unreleased_profit ?? 0,
      },
      {
        title: English.E63,
        firstValue: socketData?.equity?.toFixed(2) ?? 0,
      },
    ]
  }, [
    getChallengeByIdArray,
    socketData?.equity,
    socketData?.unreleased_profit,
    socketData?.unreleased_profit_per,
  ])

  const tradingStatisticsArray = useMemo(
    () => [
      {
        title: English.E72,
        firstValue: tradingStatistics?.total_closed_trade,
        secondValue: tradingStatistics?.total_buy_order,
        thirdValue: tradingStatistics?.total_sell_order,
      },
      {
        title: English.E73,
        firstValue: tradingStatistics?.win_rate_of_closed_trades,
        secondValue: tradingStatistics?.total_win,
        thirdValue: tradingStatistics?.total_loss,
      },
      {
        title: English.E79,
        firstValue: tradingStatistics?.total_profit_of_buy_trade,
        secondValue: tradingStatistics?.win_rate_of_buy_order,
      },
      {
        title: English.E258,
        firstValue: tradingStatistics?.total_profit_of_sell_trade,
        secondValue: tradingStatistics?.win_rate_of_sell_order,
      },
    ],
    [
      tradingStatistics?.total_buy_order,
      tradingStatistics?.total_closed_trade,
      tradingStatistics?.total_loss,
      tradingStatistics?.total_profit_of_buy_trade,
      tradingStatistics?.total_profit_of_sell_trade,
      tradingStatistics?.total_sell_order,
      tradingStatistics?.total_win,
      tradingStatistics?.win_rate_of_buy_order,
      tradingStatistics?.win_rate_of_closed_trades,
      tradingStatistics?.win_rate_of_sell_order,
    ]
  )

  return (
    <div className={`space-y-6 ${layoutClassName}`}>
      {type !== English.E257 && (
        <HeadingComponent
          singleLineContent={type === English.E64 ? English.E64 : English.E65}
          type="h2"
          variant="small"
        />
      )}

      {isLoadingSocket ? (
        <div
          className={`grid ${type === English.E257 ? 'grid-cols-1' : 'grid-cols-4'}`}
        >
          <BasicSkeleton className="!h-[105px] rounded-2xl" />
        </div>
      ) : (
        <div className={`flex flex-col gap-4 ${className}`}>
          {type === English.E64
            ? tradingObjectiveArray?.map((tradingItem, index) => {
                const {title, secondValue, firstValue} = tradingItem
                return (
                  <ChallengeCardLayout key={title}>
                    <StatsDescription
                      className="opacity-50"
                      headingContent={title}
                      infoContent="Hello this is info Demo"
                      initialContent={firstValue ?? 0}
                      type={English.E64}
                      secondContent={
                        index === 2
                          ? (socketData?.daily_drawdown ?? 0)
                          : index === 3
                            ? (socketData?.max_daily_loss_amount ?? 0)
                            : (secondValue ?? 0)
                      }
                    />
                  </ChallengeCardLayout>
                )
              })
            : type === English.E257
              ? percentageCardsArray?.map((tradingItem) => {
                  const {title, firstValue, secondValue} = tradingItem
                  return (
                    <ChallengeCardLayout key={title}>
                      <StatsDescription
                        className="opacity-50"
                        headingContent={title}
                        infoContent="Hello this is info Demo"
                        initialContent={Number(firstValue)}
                        secondContent={Number(secondValue)}
                        type={English.E257}
                      />
                    </ChallengeCardLayout>
                  )
                })
              : tradingStatisticsArray?.map((tradingItem) => {
                  const {title, firstValue, secondValue, thirdValue} =
                    tradingItem
                  return (
                    <ChallengeCardLayout key={title}>
                      <StatsDescription
                        headingContent={title}
                        infoContent="Hello this is info Demo"
                        initialContent={Number(firstValue)}
                        secondContent={Number(secondValue)}
                        thirdContent={Number(thirdValue)}
                        type={English.E65}
                      />
                    </ChallengeCardLayout>
                  )
                })}
        </div>
      )}
    </div>
  )
}

export default memo(TradingDescriptionSection)
