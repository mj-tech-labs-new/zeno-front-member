import dayjs from 'dayjs'
import React, {useCallback, useEffect, useState} from 'react'
import {toast} from 'react-toastify'

import {
  BasicPagination,
  CommonTableComponent,
  DownloadButton,
} from '@/components'
import {Constants, English, Utility} from '@/helpers'
import {getCertificatesApi} from '@/pages/ChallengeDashboard/api/ChallengeDashboardApi'
import {
  CertificateTableProps,
  GetCertificateProps,
} from '@/types/ChallengeTypes'
import {PaginationType} from '@/types/CommonTypes'

const CertificateTab = (props: CertificateTableProps) => {
  const {activeIndex, setLoader} = props
  const [certificateData, setCertificateData] = useState<GetCertificateProps[]>(
    []
  )
  const [paginationData, setPaginationData] = useState<PaginationType | null>(
    null
  )

  const getCertificate = useCallback(
    (type: string, page: number, limit: number) => {
      setLoader(true)
      getCertificatesApi(type, page, limit)
        .then((res) => {
          if (res) {
            setCertificateData(res.data)
            setPaginationData(res.pagination)
          }
        })
        .catch((error) => {
          toast.error(error)
        })
        .finally(() => {
          setLoader(false)
        })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  useEffect(() => {
    getCertificate(
      activeIndex === 0 ? 'all' : activeIndex === 1 ? 'profit' : 'passed',
      1,
      10
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex])

  return (
    <div>
      <CommonTableComponent
        tableHeading={Constants.Certificate.CertificatesHeadingData}
      >
        {certificateData.length === 0 ? (
          <tr className="font-medium text-chart-text-primary-color text-lg text-center !whitespace-nowrap">
            <td className="py-8" colSpan={6}>
              No Certificates
            </td>
          </tr>
        ) : (
          <React.Fragment>
            {certificateData?.map((tableBody: GetCertificateProps) => {
              const {
                id,
                challenge_name,
                trading_capital,
                status,
                certificate_id,
                created_at,
                challenge_id,
              } = tableBody
              return (
                <tr
                  key={`content-${id}`}
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
                  <td className="p-6 text-secondary-light-color">{status}</td>
                  <td className="p-6 text-secondary-light-color">
                    {dayjs(created_at).format('YYYY-MM-DD')}
                  </td>
                  <td className="text-secondary-light-color ">
                    <DownloadButton
                      challenge_id={challenge_id ?? ''}
                      singleLineContent={English.E99}
                    />
                  </td>
                </tr>
              )
            })}
          </React.Fragment>
        )}
      </CommonTableComponent>
      {paginationData && (
        <BasicPagination
          total={paginationData?.totalPages}
          onSelectPage={(page) => {
            getCertificate(
              activeIndex === 0
                ? 'all'
                : activeIndex === 1
                  ? 'profit'
                  : 'passed',
              page,
              10
            )
          }}
        />
      )}
    </div>
  )
}

export default CertificateTab
