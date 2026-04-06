/* eslint-disable no-underscore-dangle */
import {useCallback, useEffect, useRef, useState} from 'react'
import {useSelector} from 'react-redux'
import {useLocation, useNavigate} from 'react-router-dom'

import {DescriptionComponent, HeadingComponent, Loader} from '@/components'
import {English} from '@/helpers'
import Layout2 from '@/layouts/Layout2'
import {CommonFunction} from '@/services'
import {ChallengePayoutObject} from '@/types/ChallengeTypes'
import {StorageProps} from '@/types/CommonTypes'

import {getPaymentQrCode} from './api/CreateChallengeApis'
import Payout from './sections/Payout'
import Steps from './sections/Steps'

const CreateChallenge = () => {
  const mountRef = useRef(false)
  const location = useLocation()
  const userData = useSelector((state: StorageProps) => state.userData)
  const payoutData = useSelector(
    (state: StorageProps) => state.userData.payoutDetails
  )
  const [payoutDetails, setPayoutDetails] = useState<ChallengePayoutObject>({
    amount: '---',
    capital: '---',
    name: '---',
    type: '---',
    plan_icon_url: '',
  })
  const [paymentDetails, setPaymentDetails] = useState<
    Record<string, string | number | boolean>
  >({
    qrCode: '',
    wallet_address: '',
    transactionId: 0,
  })
  const [showLoader, setShowLoader] = useState(false)
  const [selectedOption, setSelectedOption] = useState(1)
  const [selectedTableRow, setSelectedTableRow] = useState('')
  const navigate = useNavigate()

  const handleGetPaymentQR = useCallback(() => {
    setShowLoader(true)
    getPaymentQrCode({
      challenge_plan_id:
        payoutData?.challenge_plan_id?.toString() ?? selectedTableRow,
      step: payoutData?.step ?? selectedOption,
      total_stage: payoutData?.total_stage ?? (selectedOption === 1 ? 2 : 3),
    })
      .then((res) => {
        setShowLoader(false)
        if (res) {
          setPaymentDetails((prev) => ({
            ...prev,
            qrCode: res.qrDataURL,
            wallet_address: res.wallet_address,
            transactionId: res.transaction_id,
          }))
          const paymentData = {
            data: res,
            capital: payoutDetails?.capital,
            amount: payoutDetails?.amount,
            step: payoutDetails?.type,
            status: '',
          }
          navigate('/payment-screen', {state: paymentData})
        }
      })
      .finally(() => {
        setShowLoader(false)
      })
  }, [
    navigate,
    payoutData?.challenge_plan_id,
    payoutData?.step,
    payoutData?.total_stage,
    payoutDetails?.amount,
    payoutDetails?.capital,
    payoutDetails?.type,
    selectedOption,
    selectedTableRow,
  ])

  useEffect(() => {
    if (!payoutData) return
    setSelectedOption(payoutData?.step)
    handleGetPaymentQR()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payoutData])

  useEffect(() => {
    mountRef.current = true
    return () => {
      if (payoutData && userData?.user?.token) {
        mountRef.current = true
        CommonFunction.addSliceData('removePaymentDetails', {})
      }
    }
  }, [payoutData, userData?.user?.token])

  return (
    <Layout2>
      <Loader ref={(ref) => ref?.showLoader(showLoader)} />
      <div className="w-full flex flex-col gap-12 lg:gap-14 lg:w-full shrink-0">
        {location.pathname === '/' && (
          <div
            className={`${location.pathname !== '/' ? 'max-w-md mx-auto' : ''} flex flex-col gap-4 text-center`}
          >
            <HeadingComponent
              className={location.pathname === '/' ? 'text-left' : ''}
              singleLineContent={English.E201}
              variant="medium"
            />
            <DescriptionComponent
              className={location.pathname === '/' ? 'text-left' : ''}
              multilineContent={[English.E202]}
            />
          </div>
        )}
        <div
          className={`flex gap-4 flex-col lg:flex-row w-full ${location.pathname !== '/' ? 'justify-center' : ''}`}
        >
          <Steps
            onSelectedItem={(data) => {
              setSelectedOption(data?.step)
              setSelectedTableRow(data?._id)
              setPayoutDetails({
                amount: data?.capital_fund.toString(),
                capital: data?.fee.toString(),
                type: data?.step === 1 ? 'One Step' : 'Two Step',
                name: data?.challenge_name,
                status: data?.plan_status.toString(),
                plan_icon_url: data?.plan_icon_url ?? '',
              })
            }}
          />
          <div
            className={`w-full  lg:w-[385px] bg-white p-6 rounded-2xl ${location.pathname === '/' ? '' : 'sticky top-0'} h-fit`}
          >
            <Payout
              amount={payoutDetails?.amount}
              capital={payoutDetails?.capital}
              name={payoutDetails?.name}
              plan_icon_url={payoutDetails?.plan_icon_url}
              type={payoutDetails?.type}
              className={
                paymentDetails?.transactionId !== 0
                  ? '!pointer-events-none'
                  : ''
              }
              onPressItem={() => {
                if (!userData?.user?.token) {
                  CommonFunction.addSliceData('addPaymentDetails', {
                    challenge_plan_id: selectedTableRow,
                    step: selectedOption,
                    total_stage: selectedOption === 1 ? 2 : 3,
                    capital: payoutDetails?.capital,
                  }).then(() => {
                    navigate('/login')
                  })
                  return
                }
                handleGetPaymentQR()
              }}
            />
          </div>
        </div>
      </div>
    </Layout2>
  )
}

export default CreateChallenge
