import dayjs from 'dayjs'
import {useEffect, useRef, useState} from 'react'
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
import {APICall, Endpoints} from '@/services'
import {
  GetBillingProps,
  GetBillingWithPaginationProps,
} from '@/types/ChallengeTypes'
import {PaginationType} from '@/types/CommonTypes'
import {AppLoaderRef} from '@/types/ComponentTypes'

const BillingPage = () => {
  const [billingData, setBillingData] = useState<GetBillingProps[]>([])
  const [paginationData, setPaginationData] = useState<PaginationType | null>(
    null
  )
  const loaderRef = useRef<AppLoaderRef>(null)

  const getBillingApi = async (page: number) =>
    new Promise<GetBillingWithPaginationProps | null>((resolve) => {
      loaderRef.current?.showLoader(true)
      APICall('get', Endpoints.getBilling(page, 10))
        .then((res: any) => {
          if (res?.status === 200 && res?.statusCode === 200) {
            const paginationObject: PaginationType = {
              limit: res?.data?.limit,
              page: res?.data?.page,
              total: res?.data?.total,
              totalPages: res?.data?.totalPages,
            }
            setBillingData(res?.data?.billes)
            setPaginationData(paginationObject)
          } else {
            resolve(null)
            toast.error(res?.message)
          }
        })
        .catch((error) => {
          resolve(null)
          toast.error(error?.data?.message)
        })
        .finally(() => {
          loaderRef.current?.showLoader(false)
        })
    })

  useEffect(() => {
    getBillingApi(1)
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
              No Bills
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
            getBillingApi(page)
          }}
        />
      )}
    </div>
  )
}

export default BillingPage
