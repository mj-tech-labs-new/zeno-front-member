import {memo, useRef, useState} from 'react'

import {Images} from '@/helpers'
import {useClickOutside} from '@/hooks'
import {AccordianPropsType} from '@/types/ComponentTypes'

import CommonButton from '../CommonButton/CommonButton'

const Accordian = (props: AccordianPropsType) => {
  const {
    multilineContent,
    singleLineContent,
    className = '',
    isDirectType = false,
    layoutClassName = '',
  } = props
  const accordianDivRef = useRef<HTMLDivElement>(null)
  const [isAccordianOpen, setIsAccordianOpen] = useState(isDirectType || false)

  useClickOutside({
    refs: [accordianDivRef],
    onClickOutside() {
      if (isDirectType) return
      setIsAccordianOpen(false)
    },
  })

  return (
    <div
      ref={accordianDivRef}
      className={`flex ${isDirectType && 'gap-5 items-start justify-between'} ${layoutClassName}`}
      onClick={() => {
        if (isDirectType) return
        setIsAccordianOpen((data) => !data)
      }}
    >
      <div
        className={`${multilineContent?.length > 0 && isAccordianOpen ? 'flex flex-col gap-0.5' : ''} : ${className}`}
      >
        <p className="text-tertiary-color font-normal text-sm/5">
          {singleLineContent}
        </p>
        <div
          className={`overflow-y-auto no-scrollbar transition-all duration-300 ease-in-out ${isAccordianOpen ? 'max-h-56 opacity-100 mt-5' : 'max-h-0 opacity-0 mt-0'}`}
        >
          {multilineContent?.map((item) => (
            <p
              key={item}
              className="text-secondary-light-color font-normal text-sm/5"
            >
              {item}
            </p>
          ))}
        </div>
      </div>

      {!isDirectType && (
        <CommonButton
          className={`!w-fit !p-0 [&>div]:size-3 !mb-auto  transition-transform duration-300 ease-in-out ${isAccordianOpen && 'rotate-45'}`}
          imageUrl={Images.plusIcon}
          singleLineContent=""
        />
      )}
    </div>
  )
}

export default memo(Accordian)
