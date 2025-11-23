import {memo, useEffect, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

import {CommonButton} from '@/components'
import {Constants, English} from '@/helpers'
import {CommonBuyAndSellProp} from '@/types/ChartTypes'

import chartPageApi from '../api/ChartPageApi'
import {useChartProvider} from '../context/ChartProvider'

const ActionButton = (props: CommonBuyAndSellProp) => {
  const {
    activeIndex,
    total = 0,
    price,
    quantity = 0,
    order_type,
    leverage,
    stop_loss,
    take_profit,
    setInputValues,
  } = props

  const navigate = useNavigate()
  const amountRef = useRef(0)
  const {
    getChallengeByIdArray,
    chartInfo,
    setGetChallengeByIdArray,
    livePrice,
  } = useChartProvider()

  const handleButtonClick = (orderSide: string) => {
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
    chartPageApi
      .buyOrSellApi({
        symbol: chartInfo?.fullSymbolName,
        usdt_price: price,
        quantity,
        order_type,
        order_side: orderSide,
        challenge_id: getChallengeByIdArray?.[0]?.challenge_id,
        leverage,
        stop_loss,
        take_profit,
      })
      .then(async (res) => {
        setInputValues()
        if (res.isNavigateType) {
          navigate('/dashboard')
          return
        }
        setGetChallengeByIdArray((data) => {
          const previousData = data[0]
          const newData = {
            ...previousData,
            current_usdt: res?.data?.[0]?.usdt_balance_after,
          }
          return [newData]
        })
        toast.success(English.E280)
      })
  }

  useEffect(() => {
    amountRef.current = getChallengeByIdArray?.[0]?.current_usdt ?? 0
  }, [getChallengeByIdArray])

  return (
    <div className="flex flex-1 gap-3">
      {' '}
      {Constants?.BuySellActionButtons?.[activeIndex].map((item) => {
        const {name, text} = item
        return (
          <CommonButton
            key={name}
            onClick={() => handleButtonClick(name)}
            singleLineContent={text}
            className={`${name === 'buy' ? 'medium-success-btn-type' : 'bg-chart-red-color !py-4 !px-3'}  !rounded-full !font-bold !text-chart-text-primary-color 
            ${price !== 0 && quantity !== 0 ? '!pointer-events-auto' : '!pointer-events-none !opacity-50'}
            ${total < getChallengeByIdArray?.[0]?.current_usdt ? '!pointer-events-auto' : '!pointer-events-none !opacity-50'}`}
          />
        )
      })}
    </div>
  )
}

export default memo(ActionButton)
