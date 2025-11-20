import {useState} from 'react'

import {HeadingComponent, TabComponent} from '@/components'
import {Constants, English} from '@/helpers'

import BuySell from './BuySell'
import Limit from './Limit'

const PlaceOrder = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="pt-4 py-8 px-4">
      <div className="flex flex-col gap-4">
        <HeadingComponent
          className="!text-[16px]/6 !font-poppins !tracking-normal !text-neutral-primary-color"
          singleLineContent={English.E129}
          type="h2"
        />
        <TabComponent
          activeIndex={activeIndex}
          className="!font-bold !text-[14px] !leading-4 !text-chart-text-primary-color !gap-4 !font-dmsansm [&>div]:!gap-2.5"
          headingData={Constants.PlaceOrderTab}
          setActiveIndex={setActiveIndex}
          type="buttonType"
        >
          {activeIndex === 0 ? (
            <Limit activeIndex={activeIndex} />
          ) : (
            <BuySell activeIndex={activeIndex} />
          )}
        </TabComponent>
      </div>
    </div>
  )
}

export default PlaceOrder
