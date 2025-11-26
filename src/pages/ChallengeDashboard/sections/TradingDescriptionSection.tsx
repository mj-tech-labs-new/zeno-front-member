import {memo, useEffect, useMemo, useState} from 'react'

import {BasicSkeleton, HeadingComponent, StatsDescription} from '@/components'
import {useSocketProvider} from '@/GlobalProvider/SocketProvider'
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
  const {getChallengeByIdArray, tradingStatistics, challengeIdRef, showLoader} =
    useChallengeProvider()
  const {socketRef} = useSocketProvider()
  useEffect(() => {
    if (showLoader || !socketRef.current || !challengeIdRef.current) return
    if (!showLoader) {
      setIsLoadingSocket(false)
      socketRef.current?.on(
        `${SocketEmitter.DashboardEmitter.challenge_dashboard_socket}_${challengeIdRef.current}`,
        (data) => {
          setSocketData(data?.data)
        }
      )
    }
  }, [challengeIdRef, showLoader, socketRef])

  const tradingObjectiveArray = useMemo(
    () => [
      {
        title: English.E66,
        firstValue: getChallengeByIdArray?.[0]?.min_trading_day ?? 0,
        secondValue: getChallengeByIdArray?.[0]?.trading_day ?? 0,
      },
      {
        title: English.E68,
        secondValue:
          socketData?.total_available_profit ??
          getChallengeByIdArray?.[0]?.released_profit ??
          0,
        firstValue:
          socketData?.profit_target_amount ??
          getChallengeByIdArray?.[0]?.profit_target_amount ??
          0,
      },
      {
        title: English.E69,
        secondValue:
          socketData?.daily_drawdown ??
          getChallengeByIdArray?.[0]?.daily_drawdown ??
          0,
        firstValue:
          socketData?.max_daily_loss_amount ??
          getChallengeByIdArray?.[0]?.max_daily_loss_amount ??
          0,
      },
      {
        title: English.E70,
        secondValue:
          socketData?.max_current_loss ??
          getChallengeByIdArray?.[0]?.max_current_loss ??
          0,
        firstValue:
          socketData?.max_total_loss ??
          getChallengeByIdArray?.[0]?.max_total_loss ??
          0,
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
        secondValue:
          socketData?.unreleased_profit_per ??
          getChallengeByIdArray?.[0]?.unreleased_profit_per ??
          0,
        firstValue:
          socketData?.unreleased_profit ??
          getChallengeByIdArray?.[0]?.unreleased_profit ??
          0,
      },
      {
        title: English.E63,
        firstValue:
          socketData?.equity?.toFixed(2) ??
          getChallengeByIdArray?.[0]?.current_usdt ??
          0,
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
        firstValue: tradingStatistics?.total_closed_trade ?? 0,
        secondValue: tradingStatistics?.total_buy_order ?? 0,
        thirdValue: tradingStatistics?.total_sell_order ?? 0,
      },
      {
        title: English.E73,
        firstValue: tradingStatistics?.win_rate_of_closed_trades ?? 0,
        secondValue: tradingStatistics?.total_win ?? 0,
        thirdValue: tradingStatistics?.total_loss ?? 0,
      },
      {
        title: English.E79,
        firstValue: tradingStatistics?.total_profit_of_buy_trade ?? 0,
        secondValue: tradingStatistics?.win_rate_of_buy_order ?? 0,
      },
      {
        title: English.E258,
        firstValue: tradingStatistics?.total_profit_of_sell_trade ?? 0,
        secondValue: tradingStatistics?.win_rate_of_sell_order ?? 0,
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
            ? tradingObjectiveArray?.map((tradingItem) => {
                const {title, secondValue, firstValue} = tradingItem
                return (
                  <ChallengeCardLayout key={title}>
                    <StatsDescription
                      className="opacity-50"
                      headingContent={title}
                      infoContent="Hello this is info Demo"
                      initialContent={firstValue ?? 0}
                      secondContent={secondValue}
                      type={English.E64}
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
