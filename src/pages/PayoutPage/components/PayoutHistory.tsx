import {memo, useCallback, useEffect, useMemo, useState} from 'react'

import {BasicSkeleton} from '@/components'
import {Constants, English} from '@/helpers'
import {PayoutHistoryPayload} from '@/types/apiTypes/PayoutApiType'
import {PaginationType} from '@/types/CommonTypes'

import PayoutApi from '../api/PayoutApi'
import PayoutLayout from '../layout/PayoutLayout'
import CustomFilter from './CustomFilter'

const PayoutHistory = () => {
  // const [totalPayout, setTotalPayout] = useState<any[]>([])
  const [isLoadingPayout, setIsLoadingPayout] = useState(true)
  const [paginationData, setPaginationData] = useState<PaginationType | null>(
    null
  )
  const dropDownData1 = useMemo(
    () => Constants.OneStepTwoStepArray.map((item) => ({title: item})),
    []
  )

  const getPayoutData = useCallback((data: PayoutHistoryPayload) => {
    setIsLoadingPayout(true)
    const {
      challenge_name,
      fromDate,
      limit,
      order_type,
      order_value,
      page,
      payment_status,
      search_type,
      search_value,
      toDate,
    } = data
    PayoutApi.getPayoutHistory({
      challenge_name,
      fromDate,
      limit,
      order_type,
      order_value,
      page,
      payment_status,
      search_type,
      search_value,
      toDate,
    })
      .then(() => {})
      .finally(() => {
        setIsLoadingPayout(false)
      })
  }, [])

  useEffect(() => {
    getPayoutData({
      challenge_name: '',
      fromDate: '',
      limit: 10,
      order_type: '',
      order_value: '',
      page: 1,
      payment_status: '',
      search_type: '',
      search_value: '',
      toDate: '',
    })
    setPaginationData(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PayoutLayout singleLineContent={English.E102}>
      <CustomFilter
        dropDownData1={dropDownData1}
        dropDownData2={Constants.UserPaymentStatus}
        paginationData={paginationData}
        placeHolder1={English.E36}
        placeHolder2={English.E52}
        onPressSearch={(
          dropDown1Value,
          dropDownValue2,
          searchValue,
          sDate,
          endDate,
          page
        ) => {
          getPayoutData({
            challenge_name: dropDown1Value ?? '',
            fromDate: sDate ?? '',
            limit: 10,
            order_type: 'DESC',
            order_value: 'created_at',
            page,
            payment_status: dropDownValue2 ?? '',
            search_type: 'payout_id',
            search_value: searchValue ?? '',
            toDate: endDate ?? '',
          })
        }}
      >
        {isLoadingPayout ? (
          <BasicSkeleton className="h-33! w-full" />
        ) : (
          <span>Hello</span>
        )}
      </CustomFilter>
    </PayoutLayout>
  )
}

export default memo(PayoutHistory)
