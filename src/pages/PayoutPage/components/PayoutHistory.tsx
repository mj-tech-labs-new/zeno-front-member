import dayjs from 'dayjs'
import React, {memo, useCallback, useEffect, useMemo, useState} from 'react'

import {
  BasicSkeleton,
  CommonTableComponent,
  EmptyComponent,
  ImageComponent,
} from '@/components'
import {Constants, English, Images, Utility} from '@/helpers'
import {
  PayoutHistoryData,
  PayoutHistoryPayload,
} from '@/types/apiTypes/PayoutApiType'
import {PaginationType} from '@/types/CommonTypes'

import PayoutApi from '../api/PayoutApi'
import PayoutLayout from '../layout/PayoutLayout'
import CustomFilter from './CustomFilter'

const PayoutHistory = () => {
  const [totalPayout, setTotalPayout] = useState<PayoutHistoryData[]>([])
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
      .then((res) => {
        if (!res) return
        setTotalPayout(res.data)
        setPaginationData(res.pagination)
      })
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
          <CommonTableComponent
            layoutClassName="bg-tertiary-bg-color  border! border-solid! border-info-bg-color!"
            tableHeading={Constants.PayoutHistoryHeading}
          >
            {totalPayout?.length === 0 ? (
              <EmptyComponent isTableType />
            ) : (
              totalPayout?.map((item) => {
                const {
                  amount,
                  challenge_id,
                  date,
                  payment_method,
                  payment_status,
                  payout_id,
                  tx_hash,
                  wallet_address,
                } = item
                return (
                  <tr
                    key={challenge_id}
                    className="*:px-6 border-b border-info-bg-color border-solid *:py-6 *:whitespace-nowrap *:text-sm *:leading-5 *:font-light *:font-inter *:text-secondary-light-color"
                  >
                    <td className="text-primary-color!  ">{payout_id}</td>
                    <td className="text-primary-color!">{challenge_id}</td>
                    <td>{dayjs(date).format('YYYY-MM-DD')}</td>
                    <td>{`${Utility.numberConversion(amount)} ${English.E60}`}</td>
                    <td>{Utility.generateTrimmedWallet(wallet_address)}</td>
                    <td className="flex items-center gap-2">
                      {payment_status === 0 ? (
                        <span>{English.E101}</span>
                      ) : (
                        <React.Fragment>
                          <ImageComponent
                            className="size-5!"
                            imageUrl={Images.paidStatus}
                          />
                          <span>{English.E95}</span>
                        </React.Fragment>
                      )}
                    </td>
                    <td className="capitalize">{`${English.E60} (${payment_method})`}</td>
                    <td>{Utility.generateTrimmedWallet(tx_hash ?? '')}</td>
                  </tr>
                )
              })
            )}
          </CommonTableComponent>
        )}
      </CustomFilter>
    </PayoutLayout>
  )
}

export default memo(PayoutHistory)
