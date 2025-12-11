import {useCallback, useEffect, useMemo, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

import {English} from '@/helpers'
import {CommonFunction} from '@/services'
import {CreateChallengeProps} from '@/types/ChallengeTypes'
import {CommonBuyAndSellProp} from '@/types/ChartTypes'

import {getCheckPaymentApi} from '../api/CreateChallengeApis'

const PaymentInstruction = (
  props: Pick<CommonBuyAndSellProp, 'usdt_price'> &
    Pick<CreateChallengeProps, 'transaction_id'>
) => {
  const {usdt_price = 0, transaction_id} = props
  const [timer, setTimer] = useState(900)
  const navigate = useNavigate()

  const startTimer = useCallback(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const handleCheckPayment = useCallback(() => {
    if (!transaction_id) return
    getCheckPaymentApi({transaction_id})
      .then((res) => {
        if (res?.data?.payment_status === 'paid') {
          toast.success(res?.message)
          CommonFunction.addSliceData('removePaymentDetails', {})
          navigate('/dashboard')
        }
      })
      .finally(() => {})
  }, [navigate, transaction_id])

  const PaymentDetails = useMemo(
    () => [
      {title: English.E358, content: English.E60},
      {title: English.E359, content: English.E365},
      {title: English.E360, content: ''},
      {title: English.E361, content: English.E366},
    ],
    []
  )

  useEffect(() => {
    if (!transaction_id || timer === 0) return
    const intervalId = setInterval(() => {
      handleCheckPayment()
    }, 10000)

    // eslint-disable-next-line consistent-return
    return () => clearInterval(intervalId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transaction_id])
  useEffect(() => {
    if (!transaction_id) return
    startTimer()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      <div className="font-bold text-primary-dark-blue-color">
        {formatTime(timer)}
      </div>
      <div className="font-bold text-primary-dark-blue-color">
        {English.E363}
      </div>
      <div className="flex flex-col gap-2.5 justify-center items-center ">
        {PaymentDetails.map((item) => {
          const {content, title} = item
          return (
            <div key={`title_${title}`} className=" font-switzer flex gap-1.5">
              <div className=" text-text-info-color capitalize font-bold text-nowrap">
                {title}
              </div>
              <div
                className={`text-text-info-color/80 font-semibold ${title === English.E360 ? '!text-primary-green' : ' '}  `}
              >
                {title === English.E360 ? `USDT ${usdt_price ?? 0}` : content}
              </div>
            </div>
          )
        })}
      </div>
      <div className="text-center text-dark-danger-color font-semibold text-sm ">
        <div>
          {English.E362} : {English.E364}
        </div>
      </div>
    </div>
  )
}

export default PaymentInstruction
