import {memo} from 'react'

import {Images} from '@/helpers'
import {AccordianPropsType} from '@/types/ComponentTypes'

import CommonButton from '../CommonButton/CommonButton'

const Accordian = (props: AccordianPropsType) => {
  const {
    multilineContent,
    singleLineContent,
    className = '',
    isDirectType = false,
    layoutClassName = '',
    onPressItem,
    isLineType = false,
    isNotCloseType = true,
    isOpen = true,
  } = props

  return (
    <div
      className={`flex ${isDirectType && 'gap-5 items-start justify-between'}  ${layoutClassName}`}
      onClick={() => {
        if (isLineType && onPressItem && !isOpen) {
          onPressItem()
        }
      }}
    >
      <div
        className={`${multilineContent?.length > 0 && isOpen ? 'flex flex-col gap-0.5 pointer-events-none' : 'pointer-events-auto cursor-pointer'} : ${className}`}
      >
        <div
          className={`flex gap-5 items-center relative pb-4 ${isLineType ? 'pt-4 border-t border-solid border-primary-black/10' : ''} ${isOpen ? 'animating_line' : ''}`}
        >
          {isLineType && (
            <span
              className={`block size-1.5 rounded-full ${!isOpen ? 'bg-secondary-light-color' : 'bg-extra-dark-danger-color'}`}
            />
          )}
          <p className="text-primary-black font-semibold font-geist! text-lg/7">
            {singleLineContent}
          </p>
        </div>
        <div
          className={`overflow-y-auto no-scrollbar transition-all duration-300 ease-in-out ${isOpen ? 'max-h-56 opacity-100' : 'max-h-0 opacity-0 mt-0'}`}
        >
          {multilineContent?.map((item) => (
            <p
              key={item}
              className="text-primary-black/50 font-normal font-geist! text-base/6"
            >
              {item}
            </p>
          ))}
        </div>
      </div>

      {!isDirectType && isNotCloseType && (
        <CommonButton
          className={`!w-fit !p-0 [&>div]:size-3 !mb-auto  transition-transform duration-300 ease-in-out ${isOpen && 'rotate-45'}`}
          imageUrl={Images.plusIcon}
          singleLineContent=""
        />
      )}
    </div>
  )
}

export default memo(Accordian)
