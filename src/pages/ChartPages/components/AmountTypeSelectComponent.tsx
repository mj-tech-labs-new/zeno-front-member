import {useEffect, useState} from 'react'

import {CommonButton} from '@/components'
import {Constants, English} from '@/helpers'
import {CommonFunction} from '@/services'
import {Store} from '@/store'

const AmountTypeSelectComponent = (props: {onPressButton: () => void}) => {
  const {onPressButton} = props
  const [selectedAmount, setSelectedAmount] = useState('')

  useEffect(() => {
    setSelectedAmount(Store.getState().chartData.amountType)
  }, [])

  return (
    <div className="flex flex-col gap-5 text-amber-600  mt-5">
      {Constants.MarketAmountType.map((item) => {
        const {content, heading} = item
        return (
          <div
            key={`heading_${heading}`}
            className={` bg-neutral-secondary-color border-2 border-neutral-secondary-color  py-4 rounded px-4 hover:bg-chart-red-color/10 hover:border-2 hover:border-chart-red-color cursor-pointer 
                                ${selectedAmount === heading ? '!bg-chart-red-color/10 !border-2  !border-chart-red-color' : ''}`}
            onClick={async () => {
              CommonFunction.addSliceData('addAmountType', {amount: heading})
              setSelectedAmount(Store.getState().chartData.amountType)
            }}
          >
            <div className="text-primary-color font-bold text-lg">
              {heading}
            </div>
            <div className="text-primary-color font-normal text-sm">
              {content}
            </div>
          </div>
        )
      })}
      <div className="flex justify-end gap-4 ">
        {Array.from({length: 2}).map((__, index) => (
          <CommonButton
            key={`index_${index}`}
            className={`!w-32 font-semibold text-md ${index === 0 ? 'bg-chart-red-color text-primary-color' : 'bg-neutral-secondary-color text-primary-color'}`}
            singleLineContent={index === 0 ? English.E377 : English.E378}
            onClick={() => {
              onPressButton()
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default AmountTypeSelectComponent
