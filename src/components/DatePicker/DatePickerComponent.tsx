import {memo} from 'react'
import DatePicker from 'react-datepicker'

import {DatePickerProps} from '@/types/ComponentTypes'

const DatePickerComponent = (props: DatePickerProps) => {
  const {selectedDate1, selectedDate2, className = '', onSelectDate} = props
  return (
    <div
      className={`pl-4 pr-3 py-3 bg-dropdown-bg-color rounded-lg ${className}`}
    >
      <DatePicker
        selectsRange={true}
        startDate={selectedDate1}
        endDate={selectedDate2}
        onChange={(update) => {
          onSelectDate(update)
        }}
        withPortal
      />
    </div>
  )
}

export default memo(DatePickerComponent)
