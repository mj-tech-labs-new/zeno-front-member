import {useMemo} from 'react'

import CommonTableComponent from '@/components/CommonTableComponent/CommonTableComponent'
import {English} from '@/helpers'
import {SimpleTabProps} from '@/types/ComponentTypes'

const StepComponent = (props: Pick<SimpleTabProps, 'selectedIndex'>) => {
  const {selectedIndex} = props
  const stepTableHeading = useMemo(() => {
    const defaultArray = [
      {content: [English.E36], showArrow: false},
      {content: [English.E224], showArrow: false},
      {content: [English.E226], showArrow: false},
    ]

    if (selectedIndex === 1) {
      defaultArray.splice(2, 0, {content: [English.E225], showArrow: false})
    }

    return defaultArray
  }, [selectedIndex])

  const stepBodyContent = useMemo(
    () => [
      {
        name: 'Profit Target',
        itemContent1: selectedIndex === 0 ? '15%' : '8%',
        itemContent2: selectedIndex === 0 ? '' : '5%',
        bodyContent: 'Unlimited',
      },
      {
        name: 'Max Daily Loss',
        itemContent1: selectedIndex === 0 ? '4%' : '5%',
        itemContent2: selectedIndex === 0 ? '' : '5%',
        bodyContent: '5%',
      },
      {
        name: 'Max total loss',
        itemContent1: selectedIndex === 0 ? '8%' : '10%',
        itemContent2: selectedIndex === 0 ? '' : '8%',
        bodyContent: '8%',
      },
      {
        name: 'Minimum trading days',
        itemContent1: selectedIndex === 0 ? '10%' : '5%',
        itemContent2: selectedIndex === 0 ? '' : '5%',
        bodyContent: 'unlimited',
      },
    ],
    [selectedIndex]
  )

  return (
    <div>
      <div className="flex flex-col w-full">
        <CommonTableComponent
          className="whitespace-nowrap"
          layoutClassName="border border-solid border-landing-page-trading-rules-para-text *:font-geist!"
          showArrows={false}
          tableHeading={stepTableHeading}
        >
          {stepBodyContent?.map((tableBody) => {
            const {name, itemContent1, itemContent2, bodyContent} = tableBody
            return (
              <tr
                key={`TableRow-${name}`}
                className=" border-b border-landing-page-trading-rules-para-text  text-base/6 *:transition-all *:duration-300 *:ease-in-out  whitespace-nowrap *:px-6 *:py-4 *:text-secondary-light-color "
              >
                <td className="!text-tertiary-color capitalize w-[240px]">
                  {name}
                </td>
                <td className="p-6 text-secondary-light-color w-[186px] ">
                  {itemContent1}
                </td>
                {selectedIndex === 0 ? (
                  ''
                ) : (
                  <td className="p-6 text-secondary-light-color  w-[186px]">
                    {itemContent2}
                  </td>
                )}
                <td className="p-6 text-secondary-light-color">
                  {bodyContent}
                </td>
              </tr>
            )
          })}
        </CommonTableComponent>
      </div>
    </div>
  )
}

export default StepComponent
