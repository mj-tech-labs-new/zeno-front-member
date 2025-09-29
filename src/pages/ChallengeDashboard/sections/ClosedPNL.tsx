// import { useState } from "react"

import {HeadingComponent} from '@/components'
import {English} from '@/helpers'

const ClosedPNL = () => {
  // const [selectedDate, setSelectedDate] = useState({
  //     date1: '', date2: ''
  // })
  return (
    <div className="space-y-7">
      <div className="w-full flex items-center justify-between gap-5">
        <div className="flex flex-col gap-1">
          <HeadingComponent singleLineContent={English.E81} />
          <p className="text-text-hint-color text-base/6 font-normal flex items-center gap-2">
            {English.E82}{' '}
            <span>
              {' '}
              {English.E83}{' '}
              <span className="underline text-tertiary-color">
                {English.E84}
              </span>
            </span>{' '}
          </p>
        </div>
        {/* <DatePickerComponent
                    selectedDate1={selectedDate?.date1 as unknown as Date} 
                    onSelectDate={(data) => {
                        // setSelectedDate()
                    }} /> */}
      </div>
    </div>
  )
}

export default ClosedPNL
