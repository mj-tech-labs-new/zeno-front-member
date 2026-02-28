import {useRef, useState} from 'react'

import {
  BasicPagination,
  CommonButton,
  DatePickerComponent,
  DropDown,
  SearchComponent,
} from '@/components'
import {English} from '@/helpers'
import {DateObject, DropDownObjectType} from '@/types/CommonTypes'
import {CustomFilterType} from '@/types/ComponentTypes'

const CustomFilter = (props: CustomFilterType) => {
  const {
    onPressSearch,
    dropDownData1 = [],
    dropDownData2 = [],
    placeHolder1 = '',
    placeHolder2 = '',
    children,
    paginationData,
  } = props
  const [dropDown1Value, setDropDown1Value] = useState<DropDownObjectType>({
    title: 'None',
  })
  const [dropDown2Value, setDropDown2Value] = useState<DropDownObjectType>({
    title: 'None',
  })
  const [selectedDate, setSelectedDate] = useState<DateObject>({
    date1: null,
    date2: null,
  })
  const [searchValue, setSearchValue] = useState('')
  const currentPageRef = useRef(1)

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5">
        <div className="w-full flex justify-between flex-wrap gap-5">
          <SearchComponent
            className="border-none! text-13 leading-6! font-light font-switzer! bg-landing-page-trading-rules-para-text! gap-2! [&>div]:first:w-4! lg:w-[30%]"
            layoutClassName="!text-tertiary-color placeholder:!text-tertiary-color"
            onPressSearch={setSearchValue}
            placeholder={English.E438}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />

          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-13 leading-6! font-switzer! whitespace-nowrap font-light text-primary-color">
              {English.E437}
            </span>
            <DropDown
              className="bg-landing-page-trading-rules-para-text! h-10! flex items-center justify-center border-none! [&>div]:gap-2! shrink-0"
              dropDownData={dropDownData1}
              onSelectValue={setDropDown1Value}
              selectedValue={
                dropDown1Value?.title === 'None'
                  ? {title: placeHolder1}
                  : dropDown1Value
              }
            />
            <DropDown
              className="bg-landing-page-trading-rules-para-text! h-10! flex items-center justify-center border-none! [&>div]:gap-2! shrink-0"
              dropDownData={dropDownData2}
              onSelectValue={setDropDown2Value}
              selectedValue={
                dropDown2Value?.title === 'None'
                  ? {title: placeHolder2}
                  : dropDown2Value
              }
            />
            <DatePickerComponent
              isDropDownType
              className="!max-w-fit flex items-center"
              dateFormate="d MMM yyyy"
              minDate={selectedDate.date1 as unknown as Date}
              selectedDate1={selectedDate.date1 as unknown as Date}
              selectedDate2={selectedDate.date2 as unknown as Date}
              showIcon={false}
              onSelectDate={(data) => {
                setSelectedDate({date1: data?.[0] ?? null, date2: data?.[1]})
              }}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-end ">
          <CommonButton
            className="light-danger-btn-type py-1.5! w-fit!"
            singleLineContent={English.E439}
            onClick={(e) => {
              e.stopPropagation()
              onPressSearch(
                dropDown1Value.title,
                dropDown2Value.title,
                searchValue,
                selectedDate.date1?.toString(),
                selectedDate.date2?.toString(),
                currentPageRef.current
              )
            }}
          />
          <CommonButton
            className="secondary-btn-type py-1.5! w-fit!"
            singleLineContent={English.E383}
            onClick={(e) => {
              e.stopPropagation()
              currentPageRef.current = 1
              setSearchValue('')
              setDropDown1Value({title: 'None'})
              setDropDown2Value({title: 'None'})
              setSelectedDate({date1: null, date2: null})
              onPressSearch('None', 'None', '', '', '', 1)
            }}
          />
        </div>
      </div>
      {children}
      {paginationData !== null && (
        <BasicPagination
          total={paginationData.totalPages}
          onSelectPage={(page) => {
            currentPageRef.current = page
          }}
        />
      )}
    </div>
  )
}

export default CustomFilter
