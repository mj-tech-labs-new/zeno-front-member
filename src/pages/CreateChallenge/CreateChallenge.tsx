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
import CreateChallengeContainer from './sections/CreateChallengeContainer'
import Payout from './sections/Payout'
import TradingCapitalContainer from './sections/TradingCapitalContainer'

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
  const [selectedTableRow, setSelectedTableRow] = useState(1)
  const navigate = useNavigate()

  const handleGetPaymentQR = useCallback(() => {
    setShowLoader(true)
    getPaymentQrCode({
      challenge_plan_id: payoutData?.challenge_plan_id ?? selectedTableRow,
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
    if (!selectedOption) return
    setPayoutDetails(() => ({
      amount: '---',
      capital: '---',
      name: '---',
      type: '---',
    }))
  }, [selectedOption])

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
        <div className="flex gap-4 flex-col justify-center lg:flex-row w-full">
          <div
            className={`w-full flex flex-col gap-4 lg:w-2/3 ${paymentDetails?.transactionId !== 0 ? '!pointer-events-none' : ''}`}
          >
            <CreateChallengeContainer
              onPressStage={setSelectedOption}
              selectedOption={selectedOption}
            />
            <TradingCapitalContainer
              selectedOption={selectedOption}
              setSelectedTableRow={setSelectedTableRow}
              onPressItem={(data) => {
                setPayoutDetails(data)
              }}
            />
          </div>
          <div
            className={`w-full  lg:w-[385px] bg-white p-6 rounded-2xl ${location.pathname === '/' ? '' : 'sticky top-0'} h-fit`}
          >
            <Payout
              amount={payoutDetails?.amount}
              capital={payoutDetails?.capital}
              name={payoutDetails?.name}
              type={payoutDetails?.type}
              // onPressItem={() => {
              //   if (!userData?.user?.token) {
              //     CommonFunction.addSliceData('addPaymentDetails', {
              //       challenge_plan_id: selectedTableRow,
              //       step: selectedOption,
              //       total_stage: selectedOption === 1 ? 2 : 3,
              //       capital: payoutDetails?.capital,
              //     }).then(() => {
              //       navigate('/login')
              //     })
              //     return
              //   }
              //   handleGetPaymentQR()
              // }}
            />
          </div>
        </div>
      </div>
    </Layout2>
  )
}

export default CreateChallenge
