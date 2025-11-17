import {useEffect, useRef} from 'react'
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
    leverage = '',
    setInputValuesMarket,
    setInputValuesLimit,
  } = props

  const amountRef = useRef(0)
  const {
    getChallengeByIdArray,
    setBuyOrSellApiResArray,
    chartInfo,
    buyOrSellApiResArray,
  } = useChartProvider()

  const handleButtonClick = (orderSide: string) => {
    chartPageApi
      .buyOrSellApi({
        symbol: chartInfo?.fullSymbolName,
        usdt_price: price,
        quantity,
        order_type,
        order_side: orderSide,
        challenge_id: getChallengeByIdArray?.[0]?.challenge_id,
        leverage,
      })
      .then((res) => {
        setBuyOrSellApiResArray(res)
      })
      .finally(() => {
        toast.success(English.E280)
        if (order_type === 'market') {
          setInputValuesMarket((prev: any) => ({
            ...prev,
            amount: '',
            total: '',
          }))
        }
        if (order_type === 'limit') {
          setInputValuesLimit((prev: any) => ({
            ...prev,
            entryprice: '',
            quantity: '',
          }))
        }
      })
  }

  useEffect(() => {
    amountRef.current =
      buyOrSellApiResArray?.[0]?.usdt_balance_after ??
      getChallengeByIdArray?.[0]?.current_usdt ??
      0
  }, [buyOrSellApiResArray, getChallengeByIdArray])

  return (
    <div className="flex flex-1 gap-3">
      {' '}
      {Constants?.BuySellActionButtons?.[activeIndex].map((item) => {
        const {name, text} = item
        return (
          <CommonButton
            key={name}
            className={`${name === 'buy' ? 'medium-success-btn-type' : 'bg-chart-red-color !py-4 !px-3'}  !rounded-full !font-bold !text-chart-text-primary-color ${activeIndex === 0 ? (price > getChallengeByIdArray?.[0]?.current_usdt || price === 0 ? 'opacity-50 pointer-events-none' : 'pointer-events-auto') : total === 0 || total > getChallengeByIdArray?.[0]?.current_usdt ? 'opacity-50 pointer-events-none' : 'pointer-events-auto'} `}
            onClick={() => handleButtonClick(name)}
            singleLineContent={text}
          />
        )
      })}
    </div>
  )
}

export default ActionButton
