/* eslint-disable no-sequences */
import {useCallback, useEffect, useMemo, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

import {
  CommonButton,
  CopyClipBoard,
  Divider,
  ImageComponent,
} from '@/components'
import {English, Images} from '@/helpers'
import Layout2 from '@/layouts/Layout2'
import {CommonFunction} from '@/services'

import {getCheckPaymentApi} from './api/CreateChallengeApis'

const PaymentPage = () => {
  const location = useLocation()
  const {state} = location
  const navigate = useNavigate()

  const objectToRender = useMemo(
    () => ({
      [English.E380]: 'P012397917697679979723',
      [English.E381]: 'VT-VT129387987987912',
      [English.E382]: [English.E385],
      [English.E383]: 'Waiting for Payment ',
    }),
    []
  )

  const paymentData = useMemo(
    () => ({
      [English.E379]: state?.data?.wallet_address,
      [English.E359.replace(' :', '')]: [English.E365],
    }),
    [state?.data?.wallet_address]
  )

  const [timer, setTimer] = useState(900)

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

  const handleCheckPayment = useCallback(
    (intervalId: any) => {
      if (!state?.data?.transaction_id) return
      getCheckPaymentApi({transaction_id: state?.data?.transaction_id})
        .then((res) => {
          if (res?.data?.payment_status === 'paid') {
            toast.success(res?.message)
            CommonFunction.addSliceData('removePaymentDetails', {})
            navigate('/payout-success')
            clearInterval(intervalId)
          }
        })
        .finally(() => {})
    },
    [navigate, state?.data?.transaction_id]
  )

  useEffect(() => {
    if (!state?.data?.transaction_id || timer === 0) return
    const intervalId = setInterval(() => {
      handleCheckPayment(intervalId)
    }, 10000)

    setTimeout(
      async () =>
         
        (
          clearInterval(intervalId),
          CommonFunction.addSliceData('removePaymentDetails', {})
        ),
      1000 * 60 * 10
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!state?.data?.transaction_id) return
    startTimer()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout2>
      <div className="w-full flex flex-col gap-10 max-w-[482px] 2xl:max-w-lg mx-auto">
        <div className="flex justify-center">
          <div className="w-30 sm:w-44  lg:w-44">
            <ImageComponent imageUrl={state?.data?.qrDataURL} />
          </div>
        </div>
        <div className="border border-solid border-primary-border-color p-6 rounded-2xl flex flex-col gap-[26px]">
          <div className="w-full flex flex-col gap-y-5 ">
            {Object.entries(paymentData)?.map(([key, value]) => (
              <div key={key} className="flex items-center gap-6">
                <span className="text-text-hint-color text-13 !leading-6 font-medium text-nowrap">
                  {key}
                </span>{' '}
                <Divider className="flex-1" />{' '}
                <span className="text-tertiary-color text-13 font-normal !leading-6   ">
                  {key === English.E379 ? (
                    <span className="flex">
                      <span className="truncate w-22">{value}</span>
                      <CopyClipBoard
                        className="ml-1 !w-4 !h-4 !cursor-pointer green_filter"
                        imageRelatedText="Copy"
                        imageUrl={Images.copy}
                        type="text"
                      />
                    </span>
                  ) : (
                    `${value}`
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-solid border-primary-border-color p-6 rounded-2xl flex flex-col gap-[26px]">
          <div className="w-full flex flex-col gap-y-5">
            {Object.entries(objectToRender)?.map(([key, value]) => (
              <div key={key} className="flex items-center gap-6">
                <span className="text-text-hint-color text-13 !leading-6 font-medium">
                  {key}
                </span>{' '}
                <Divider className="flex-1" />{' '}
                <span className="text-tertiary-color text-13 font-normal !leading-6">
                  {!(key === English.E38 || key === English.E51)
                    ? value
                    : `$${value}`}
                </span>
              </div>
            ))}
          </div>

          <CommonButton
            className="!px-3 !py-2 text-primary-color bg-light-success-color  [&>div>img]:!white_filter "
            imageUrl={Images.reloadIcon}
            onClick={handleCheckPayment}
            singleLineContent={English.E384}
          />
        </div>
      </div>
    </Layout2>
  )
}

export default PaymentPage
