import {memo, useCallback, useEffect, useRef, useState} from 'react'
import {useParams} from 'react-router-dom'
import {toast} from 'react-toastify'

import {CommonButton, Loader} from '@/components'
import {Constants, English} from '@/helpers'
import {getChallengeByIdApi} from '@/pages/ChallengeDashboard/api/ChallengeDashboardApi'
import {Store} from '@/store'
import {CommonBuyAndSellProp} from '@/types/ChartTypes'

import chartPageApi from '../api/ChartPageApi'
import {useChartProvider} from '../context/ChartProvider'

const ActionButton = (props: CommonBuyAndSellProp) => {
  const {
    total = 0,
    price,
    quantity = 0,
    order_type,
    leverage,
    stop_loss,
    take_profit,
    setChecked = () => {},
    checked = false,
    margin_mode,
    setInputValues,
  } = props
  const [isLoading, setIsLoading] = useState(false)

  const amountRef = useRef(0)
  const {
    getChallengeByIdArray,
    challengeId,
    livePrice,
    setGetChallengeByIdArray,
  } = useChartProvider()

  const params = useParams()

  const handleButtonClick = useCallback(
    (orderSide: string) => {
      if (!params?.challengeId) return
      if (checked) setChecked(false)

      if (orderSide === 'buy' || orderSide === 'sell') {
        const sl = stop_loss?.[0]?.price
        const tp = take_profit?.[0]?.price

        if (orderSide === 'buy') {
          if (sl && Number(sl) >= livePrice) {
            toast.error(English.E296)
            return
          }
          if (tp && Number(tp) <= livePrice) {
            toast.error(English.E296)
            return
          }
        }

        if (orderSide === 'sell') {
          if (sl && Number(sl) <= livePrice) {
            toast.error(English.E297)
            return
          }
          if (tp && Number(tp) >= livePrice) {
            toast.error(English.E297)
            return
          }
        }
      }
      setIsLoading(true)
      chartPageApi
        .buyOrSellApi({
          symbol: `${Store?.getState()?.chartData?.selectedToken?.name}USDT`,
          usdt_price: price,
          quantity,
          order_type,
          order_side: orderSide,
          challenge_id: params?.challengeId,
          leverage,
          stop_loss,
          take_profit,
          margin_mode: margin_mode?.toString() ?? 'isolated',
          role:
            order_type === 'limit'
              ? orderSide === 'buy'
                ? price <= livePrice
                  ? 'taker'
                  : 'maker'
                : price >= livePrice
                  ? 'taker'
                  : 'maker'
              : 'taker',
        })
        .then(async (res) => {
          if (res && challengeId) {
            getChallengeByIdApi({challenge_id: challengeId}).then(
              (challengeRes) => {
                setGetChallengeByIdArray(challengeRes)
              }
            )
            toast.success(English.E280)
          }
        })
        .finally(() => {
          setInputValues?.()
          setIsLoading(false)
        })
    },
    [
      challengeId,
      checked,
      leverage,
      livePrice,
      margin_mode,
      order_type,
      params?.challengeId,
      price,
      quantity,
      setChecked,
      stop_loss,
      take_profit,
      setInputValues,
      setGetChallengeByIdArray,
    ]
  )

  useEffect(() => {
    amountRef.current = getChallengeByIdArray?.[0]?.current_usdt ?? 0
  }, [getChallengeByIdArray])

  return (
    <div className="flex flex-1 gap-3">
      <Loader ref={(ref) => ref?.showLoader(isLoading)} />
      {Constants?.BuySellActionButtons?.[0].map((item) => {
        const {name, text} = item
        return (
          <CommonButton
            key={name}
            onClick={() => handleButtonClick(name)}
            singleLineContent={text}
            className={`flex-1 ${name === 'buy' ? 'bg-chart-green-color ' : 'bg-chart-red-color !px-3'} !py-2 !rounded-full !font-bold !text-chart-text-primary-color 
            ${price !== 0 && quantity !== 0 ? '!pointer-events-auto' : '!pointer-events-none !opacity-50'}
            ${Number(total?.toFixed(2)) < getChallengeByIdArray?.[0]?.current_usdt ? '!pointer-events-auto' : '!pointer-events-none !opacity-50'}`}
          />
        )
      })}
    </div>
  )
}

export default memo(ActionButton)
