import {useCallback, useEffect, useState} from 'react'
import {useSelector} from 'react-redux'

import {
  CommonTableComponent,
  DescriptionComponent,
  HeadingComponent,
  RadioInputContainer,
} from '@/components'
import {Constants, English, Utility} from '@/helpers'
import type {
  ChallengePayoutObject,
  GetTradingCapitalProps,
} from '@/types/ChallengeTypes'
import {StorageProps} from '@/types/CommonTypes'

import {getTradingCapitalApi} from '../api/CreateChallengeApis'
import CreateChallengeCardLayout from '../layout/CreateChallengeCardLayout'

const TradingCapitalContainer = (props: {
  selectedOption: number
  onPressItem: (data: ChallengePayoutObject) => void
  setSelectedTableRow: (id: number) => void
}) => {
  const [tradingCapitalData, setTradingCapitalData] = useState<
    GetTradingCapitalProps[]
  >([])
  const [showLoader, setShowLoader] = useState(false)
  const payoutData = useSelector(
    (state: StorageProps) => state.userData.payoutDetails
  )
  const {onPressItem, setSelectedTableRow, selectedOption} = props

  const handleSelectRow = useCallback((tableBody: GetTradingCapitalProps) => {
    setTradingCapitalData((prev) => {
      const newData = prev.map((previousData) => {
        if (previousData?.challenge_name === tableBody?.challenge_name) {
          if (previousData?.checked) return previousData
          setSelectedTableRow(previousData.id)
          onPressItem({
            amount: Utility.numberConversion(previousData.capital_fund),
            capital: Utility.numberConversion(previousData.fee),
            name: previousData.challenge_name,
            type: previousData.step === 1 ? English.E32 : English.E34,
          })
          return {
            ...previousData,
            checked: true,
          }
        }
        return {...previousData, checked: false}
      })

      return newData
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setShowLoader(true)
    getTradingCapitalApi(selectedOption)
      .then((res) => {
        const response = res.map((item) => ({
          ...item,
          checked: false,
        }))
        if (payoutData) {
          const selectedItems = response?.find(
            (item) => item.fee === Number(payoutData?.capital)
          )
          const prevSelectedData = {...selectedItems, checked: true}
          const changeResponse = response.map((item) =>
            item.id === selectedItems?.id ? {...item, checked: true} : item
          )
          onPressItem({
            amount: Utility.numberConversion(
              prevSelectedData?.capital_fund ?? 0
            ),
            capital: Utility.numberConversion(prevSelectedData?.fee ?? 0),
            name: prevSelectedData?.challenge_name,
            type: prevSelectedData?.step === 1 ? English.E32 : English.E34,
          })
          if (selectedItems) handleSelectRow(selectedItems)
          setSelectedTableRow(selectedItems?.id ?? 0)
          setTradingCapitalData(changeResponse)
          return
        }
        setTradingCapitalData(response)
      })
      .finally(() => setShowLoader(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CreateChallengeCardLayout>
      <div className="flex flex-col gap-11">
        <div className="flex flex-col gap-y-2">
          <HeadingComponent
            singleLineContent={English.E39}
            type="h3"
            variant="small"
          />
          <DescriptionComponent multilineContent={[English.E40]} />
        </div>

        <CommonTableComponent
          showArrows={false}
          showLoader={showLoader}
          tableHeading={Constants.ChallengeStaticTableContent?.tableHeadings}
        >
          {tradingCapitalData?.map((tableBody) => (
            <tr
              key={`content-${tableBody?.id}`}
              className={`cursor-pointer font-normal text-sm/6 *:transition-all *:duration-300 *:ease-in-out ${tableBody?.checked ? 'bg-info-bg-color' : ''}`}
              onClick={() => {
                handleSelectRow(tableBody)
              }}
            >
              <th
                className="p-6 font-medium text-gray-900 whitespace-nowrap "
                scope="row"
              >
                <RadioInputContainer
                  checked={tableBody?.checked}
                  className="text-extra-dark-danger-color cursor-pointer"
                />
              </th>

              <td className="p-6 text-tertiary-color">
                <span className="">{tableBody?.challenge_name}</span>
              </td>

              <td className="p-6 text-tertiary-color">
                <span className="">
                  ${Utility.numberConversion(tableBody?.fee)}
                </span>
              </td>

              <td className="p-6 text-tertiary-color">
                <span className="">
                  ${Utility.numberConversion(tableBody?.capital_fund)} USDT
                </span>
              </td>
            </tr>
          ))}
        </CommonTableComponent>
      </div>
    </CreateChallengeCardLayout>
  )
}

export default TradingCapitalContainer
