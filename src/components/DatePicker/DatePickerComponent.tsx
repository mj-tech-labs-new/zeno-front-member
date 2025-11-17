import 'react-datepicker/dist/react-datepicker.css'

import {memo} from 'react'
import DatePicker from 'react-datepicker'

import {English} from '@/helpers'
import {DatePickerProps} from '@/types/ComponentTypes'

const DatePickerComponent = (props: DatePickerProps) => {
  const {
    selectedDate1,
    selectedDate2 = null,
    className = '',
    onSelectDate,
    isPortalType = false,
    placeHolder,
    dateFormate,
  } = props
  return (
    <div
      className={`pl-4 pr-3 bg-landing-page-trading-rules-para-text rounded-lg h-10 ${className}`}
    >
      <DatePicker
        selectsRange
        dateFormat={dateFormate}
        endDate={selectedDate2}
        placeholderText={placeHolder ?? English.E287}
        startDate={selectedDate1}
        withPortal={isPortalType}
        onChange={(update) => {
          onSelectDate(update)
        }}
      />
    </div>
  )
}

export default memo(DatePickerComponent)
