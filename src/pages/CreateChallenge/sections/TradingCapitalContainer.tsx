import {useState} from 'react'

import {
  CommonTableComponent,
  DescriptionComponent,
  HeadingComponent,
  RadioInputContainer,
} from '@/components'
import {Constants, English} from '@/helpers'
import {TradingCapitalProps} from '@/types/ChallengeTypes'

import CreateChallengeCardLayout from '../layout/CreateChallengeCardLayout'

const TradingCapitalContainer = (props: TradingCapitalProps) => {
  const [tableBodyContent, setTableBodyContent] = useState(
    Constants.ChallengeStaticTableContent.tableBodyData
  )
  const {onPressItem} = props

  return (
    <CreateChallengeCardLayout>
      <div className="flex flex-col gap-11">
        <div className="flex flex-col gap-y-2">
          <HeadingComponent singleLineContent={English.E27} variant="small" />
          <DescriptionComponent multilineContent={[English.E31]} />
        </div>
        <CommonTableComponent
          tableHeading={Constants.ChallengeStaticTableContent?.tableHeadings}
        >
          {tableBodyContent?.map((tableBody) => {
            return (
              <tr
                className={`font-normal text-sm/6 *:transition-all *:duration-300 *:ease-in-out ${tableBody?.checked ? 'bg-info-bg-color' : ''} `}
                key={`content-${tableBody?.checkBoxRole}`}
              >
                <th
                  scope="row"
                  className="p-6 font-medium text-gray-900 whitespace-nowrap "
                >
                  <RadioInputContainer
                    checked={tableBody?.checked}
                    className="text-red-600"
                    onChange={(e) => {
                      setTableBodyContent((prev) => {
                        const newData = prev.map((previousData) => {
                          if (
                            previousData?.checkBoxRole ===
                            tableBody?.checkBoxRole
                          ) {
                            if (previousData.checked) return previousData
                            onPressItem({
                              amount: previousData.amount,
                              capital: previousData.price,
                              name: previousData.role,
                              type: previousData.checkBoxRole,
                            })
                            return {
                              ...previousData,
                              checked: e.target.checked,
                            }
                          }
                          return {...previousData, checked: false}
                        })

                        return newData
                      })
                    }}
                  />
                </th>
                <td className="p-6 text-tertiary-color">{tableBody?.role}</td>
                <td
                  className={`p-6 ${tableBody?.checked ? 'text-primary-color' : 'text-secondary-light-color'}`}
                >
                  {tableBody?.price}
                </td>
                <td
                  className={`p-6 ${tableBody?.checked ? 'text-primary-color' : 'text-secondary-light-color'}`}
                >
                  {tableBody?.amount}
                </td>
              </tr>
            )
          })}
        </CommonTableComponent>
      </div>
    </CreateChallengeCardLayout>
  )
}

export default TradingCapitalContainer
