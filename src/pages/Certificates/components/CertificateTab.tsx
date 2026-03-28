import dayjs from 'dayjs'
import React, {useEffect, useState} from 'react'
import {toast} from 'react-toastify'

import {
  BasicPagination,
  CommonTableComponent,
  DescriptionComponent,
  // DownloadButton,
} from '@/components'
import {Constants, English, Utility} from '@/helpers'
import {APICall, Endpoints} from '@/services'
import {
  CertificateTableProps,
  GetCertificateProps,
  GetCertificateResponseType,
  GetCertificateWithPaginationProps,
} from '@/types/ChallengeTypes'
import {PaginationType} from '@/types/CommonTypes'

const CertificateTab = (props: CertificateTableProps) => {
  const {activeIndex, setLoader, setIsEmpty} = props
  const [certificateData, setCertificateData] = useState<GetCertificateProps[]>(
    []
  )
  const [paginationData, setPaginationData] = useState<PaginationType | null>(
    null
  )
  const getCertificatesApi = async (type: string, page: number) =>
    new Promise<GetCertificateWithPaginationProps | null>((resolve) => {
      setLoader(true)
      APICall<{allChallenge: GetCertificateResponseType}>(
        'get',
        Endpoints.getCertificate(type, page, 10)
      )
        .then((res) => {
          if (res?.status === 200 && res?.statusCode === 200) {
            const paginationObject: PaginationType = {
              limit: res?.data?.allChallenge?.limit,
              page: res?.data?.allChallenge?.page,
              total: res?.data?.allChallenge?.total,
              totalPages: res?.data?.allChallenge?.totalPages,
              total_all_count: res?.data?.allChallenge?.total_all_count,
            }

            setCertificateData(res?.data?.allChallenge?.data ?? [])
            setIsEmpty(res?.data?.allChallenge?.data?.length === 0)
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
          setLoader(false)
        })
    })

  useEffect(() => {
    getCertificatesApi(
      activeIndex === 0 ? 'all' : activeIndex === 1 ? 'profit' : 'passed',
      1
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex])

  return (
    <div
      className={
        certificateData?.length === 0
          ? `h-full flex justify-center items-center 
         `
          : ''
      }
    >
      {certificateData?.length === 0 ? (
        <div className="flex flex-col gap-5 justify-center items-center h-full">
          <DescriptionComponent
            className="font-bold! text-3xl text-primary-color!"
            singleLineContent={English.E55}
          />
          <DescriptionComponent
            className="text-base!"
            singleLineContent={English.E273}
          />
        </div>
      ) : (
        <CommonTableComponent
          tableHeading={Constants.Certificate.CertificatesHeadingData}
        >
          <React.Fragment>
            {certificateData?.map((tableBody: GetCertificateProps) => {
              const {
                _id,
                challenge_name,
                trading_capital,
                status,
                certificate_id,
                createdAt,
                // challenge_id,
              } = tableBody
              return (
                <tr
                  key={`content-${_id}`}
                  className="font-normal text-sm/6 *:transition-all *:duration-300 *:ease-in-out"
                >
                  <th
                    className="p-6 font-medium text-secondary-light-color whitespace-nowrap "
                    scope="row"
                  >
                    {certificate_id}
                  </th>
                  <td className="p-6 text-secondary-light-color capitalize">
                    {challenge_name}
                  </td>
                  <td className="p-6 text-secondary-light-color">
                    {`${Utility.numberConversion(Number(trading_capital))} ${English.E60}`}
                  </td>
                  <td
                    className={`p-6 text-secondary-light-color  ${status === 'Profit Target' ? '' : '!text-chart-green-color'}`}
                  >
                    {status === 'Profit Target' ? status : status}
                  </td>
                  <td className="p-6 text-secondary-light-color">
                    {dayjs(createdAt).format('YYYY-MM-DD')}
                  </td>
                  <td className="p-6  text-secondary-light-color ">
                    {/* {status === 'Passed' ? (
                      <DownloadButton
                        challenge_id={challenge_id ?? ''}
                        className="pointer-events-none"
                        imageUrl={Images.pdfIcon}
                      />
                    ) : (
                      '---'
                    )} */}
                    ---
                  </td>
                </tr>
              )
            })}
          </React.Fragment>
        </CommonTableComponent>
      )}

      {paginationData && (
        <BasicPagination
          total={paginationData?.totalPages}
          onSelectPage={(page) => {
            getCertificatesApi(
              activeIndex === 0
                ? 'all'
                : activeIndex === 1
                  ? 'profit'
                  : 'passed',
              page
            )
          }}
        />
      )}
    </div>
  )
}

export default CertificateTab
