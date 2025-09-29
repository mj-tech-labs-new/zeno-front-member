import {memo, useRef, useState} from 'react'

import {useClickOutside} from '@/hooks'
import {AccordianPropsType} from '@/types/ComponentTypes'

const Accordian = (props: AccordianPropsType) => {
  const {
    multilineContent,
    singleLineContent,
    className = '',
    isDirectType = false,
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
      className={`flex flex-col gap-0.5  ${className}`}
      ref={accordianDivRef}
      onClick={() => {
        if (isDirectType) return
        setIsAccordianOpen((data) => !data)
      }}
    >
      <p className="text-tertiary-color font-normal text-sm/5">
        {singleLineContent}
      </p>
      <div
        className={`overflow-y-auto no-scrollbar transition-all duration-300 ease-in-out ${isAccordianOpen ? 'opacity-100' : 'opacity-0'}`}
      >
        {multilineContent?.map((item) => {
          return (
            <p
              key={item}
              className="text-secondary-light-color font-normal text-sm/5"
            >
              {item}
            </p>
          )
        })}
      </div>
    </div>
  )
}

export default memo(Accordian)
