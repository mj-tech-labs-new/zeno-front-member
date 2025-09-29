import {useMemo} from 'react'

import {CommonTableComponent, DownloadButton} from '@/components'
import {Constants, English, Utility} from '@/helpers'
import {CertificateTabType} from '@/types/UnionTypes'

const CertificateTab = (props: {type: CertificateTabType}) => {
  const {type} = props
  const profitTypeData = useMemo(() => {
    return Constants.Certificate.CertificatesBodyData.filter((item) =>
      item.status.toLowerCase().includes('profit')
    )
  }, [])
  const passedData = useMemo(() => {
    return Constants.Certificate.CertificatesBodyData.filter((item) =>
      item.status.toLowerCase().includes('passed')
    )
  }, [])

  const dataToMap = useMemo(() => {
    return type === 'all'
      ? Constants.Certificate.CertificatesBodyData
      : type === 'passed'
        ? passedData
        : profitTypeData
  }, [passedData, profitTypeData, type])

  return (
    <CommonTableComponent
      tableHeading={Constants.Certificate.CertificatesHeadingData}
    >
      {dataToMap?.map((tableBody) => {
        const {
          certificateId,
          challengeName,
          tradingCapital,
          status,
          issueDate,
          action,
        } = tableBody
        const capital = Number(tradingCapital)
        return (
          <tr
            className="font-normal text-sm/6 *:transition-all *:duration-300 *:ease-in-out"
            key={`content-${certificateId}`}
          >
            <th
              scope="row"
              className="p-6 font-medium text-secondary-light-color whitespace-nowrap "
            >
              {certificateId}
            </th>
            <td className="p-6 text-secondary-light-color capitalize">
              {challengeName}
            </td>
            <td className="p-6 text-secondary-light-color">
              {`${Utility.numberConversion(capital)} ${English.E60}`}
            </td>
            <td className="p-6 text-secondary-light-color">{status}</td>
            <td className="p-6 text-secondary-light-color">{issueDate}</td>
            <td className="">
              <DownloadButton className="p-6" singleLineContent={action} />
            </td>
          </tr>
        )
      })}
    </CommonTableComponent>
  )
}

export default CertificateTab
