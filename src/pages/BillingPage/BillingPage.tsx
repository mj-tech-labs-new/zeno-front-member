import dayjs from 'dayjs'
import {useCallback, useEffect, useRef, useState} from 'react'
import {toast} from 'react-toastify'

import {
  BasicPagination,
  CommonTableComponent,
  DescriptionComponent,
  DownloadButton,
  HeadingComponent,
  Loader,
} from '@/components'
import {Constants, English} from '@/helpers'
import {GetBillingProps} from '@/types/ChallengeTypes'
import {PaginationType} from '@/types/CommonTypes'
import {AppLoaderRef} from '@/types/ComponentTypes'

import {getBillingApi} from '../ChallengeDashboard/api/ChallengeDashboardApi'

const BillingPage = () => {
  const [billingData, setBillingData] = useState<GetBillingProps[]>([])
  const [paginationData, setPaginationData] = useState<PaginationType | null>(
    null
  )
  const loaderRef = useRef<AppLoaderRef>(null)
  const handleGetBilling = useCallback((page: number) => {
    loaderRef.current?.showLoader(true)
    getBillingApi(page, 10)
      .then((res) => {
        if (res) {
          setBillingData(res?.data)
          setPaginationData(res?.pagination)
        }
      })
      .catch((error) => {
        toast.error(error?.message)
      })
      .finally(() => {
        loaderRef.current?.showLoader(false)
      })
  }, [])

  useEffect(() => {
    handleGetBilling(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="flex flex-col gap-8 mt-8">
      <Loader ref={loaderRef} />
      <HeadingComponent singleLineContent={English.E109} variant="medium" />

      <DescriptionComponent multilineContent={[English.E110]} />

      <CommonTableComponent
        tableHeading={Constants.Billing.BillingTableHeadingData}
      >
        {billingData?.length === 0 ? (
          <tr className="font-medium text-chart-text-primary-color text-lg text-center !whitespace-nowrap">
            <td className="py-8" colSpan={8}>
              No Billes
            </td>
          </tr>
        ) : (
          billingData?.map((tableBody) => {
            const {
              invoice_id,
              created_at,
              challenge_id,
              challenge_plan,
              challenge_fee,
              challenge_type,
              payment_status,
            } = tableBody
            return (
              <tr
                key={`content-${invoice_id}`}
                className="font-normal text-sm/6 *:transition-all *:duration-300 *:ease-in-out"
              >
                <th
                  className="p-6 font-medium text-secondary-light-color whitespace-nowrap "
                  scope="row"
                >
                  {invoice_id}
                </th>
                <td className="p-6 text-secondary-light-color capitalize">
                  {dayjs(created_at).format('YYYY-MM-DD')}
                </td>
                <td className="p-6 text-secondary-light-color capitalize">
                  {challenge_type}
                </td>
                <td className="p-6 text-secondary-light-color capitalize">
                  {challenge_plan}
                </td>
                <td className="p-6 text-secondary-light-color">
                  {challenge_fee}
                </td>
                <td className="p-6 text-secondary-light-color">
                  {payment_status === 0 ? 'Success' : 'Failed'}
                </td>
                <td className="p-6 text-secondary-light-color">
                  {challenge_id}
                </td>
                <td>
                  <DownloadButton
                    challenge_id={challenge_id}
                    className="p-6"
                    singleLineContent={English.E99}
                  />
                </td>
              </tr>
            )
          })
        )}
      </CommonTableComponent>
      {paginationData && (
        <BasicPagination
          total={paginationData?.totalPages}
          onSelectPage={(page) => {
            handleGetBilling(page)
          }}
        />
      )}
    </div>
  )
}

export default BillingPage
