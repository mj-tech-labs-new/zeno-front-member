import {useMemo, useState} from 'react'

import {CommonTableComponent, TabComponent} from '@/components'
import {Constants, English} from '@/helpers'

const StepComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const stepTableHeading = useMemo(() => {
    const defaultArray = [
      {content: [' '], showArrow: false},
      {content: [English.E224], showArrow: false},
      {content: [English.E226], showArrow: false},
    ]

    if (activeIndex === 1) {
      defaultArray.splice(2, 0, {content: [English.E225], showArrow: false})
    }

    return defaultArray
  }, [activeIndex])

  const stepBodyContent = useMemo(
    () => [
      {
        name: 'Profit Target',
        itemContent1: activeIndex === 0 ? '15%' : '8%',
        itemContent2: activeIndex === 0 ? '' : '5%',
        bodyContent: 'Unlimited',
      },
      {
        name: 'Max Daily Loss',
        itemContent1: activeIndex === 0 ? '4%' : '5%',
        itemContent2: activeIndex === 0 ? '' : '5%',
        bodyContent: '5%',
      },
      {
        name: 'Max total loss',
        itemContent1: activeIndex === 0 ? '8%' : '10%',
        itemContent2: activeIndex === 0 ? '' : '8%',
        bodyContent: '8%',
      },
      {
        name: 'Minimum trading days',
        itemContent1: activeIndex === 0 ? '10%' : '5%',
        itemContent2: activeIndex === 0 ? '' : '5%',
        bodyContent: 'unlimited',
      },
    ],
    [activeIndex]
  )

  return (
    <TabComponent
      activeIndex={activeIndex}
      className="!gap-6 !text-xl lg:!text-[28px] !leading-[38px] !pb-0"
      headingData={Constants.StepComponentHeading}
      isDividerType={false}
      layoutClassName="font-bureau !text-extra-dark-danger-color !border-extra-dark-danger-color"
      setActiveIndex={setActiveIndex}
      type="lineType"
    >
      <div>
        <div className="flex flex-col w-full">
          <CommonTableComponent
            className="whitespace-nowrap *:!font-helvetica !border-none "
            layoutClassName="!border-none !rounded-none"
            showArrows={false}
            tableHeading={stepTableHeading}
          >
            {stepBodyContent?.map((tableBody) => {
              const {name, itemContent1, itemContent2, bodyContent} = tableBody
              return (
                <tr
                  key={`TableRow-${name}`}
                  className="font-normal bg-info-bg-color border-b border-landing-page-trading-rules-para-text  text-sm/6 *:transition-all *:duration-300 *:ease-in-out  whitespace-nowrap *:p-6 *:text-secondary-light-color "
                >
                  <td className="!text-tertiary-color capitalize w-[240px]">
                    {name}
                  </td>
                  <td className="p-6 text-secondary-light-color w-[186px] ">
                    {itemContent1}
                  </td>
                  {activeIndex === 0 ? (
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
    </TabComponent>
  )
}

export default StepComponent
