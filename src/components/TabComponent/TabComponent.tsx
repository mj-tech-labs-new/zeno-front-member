import {memo} from 'react'

import {CommonTabComponentProps} from '@/types/ComponentTypes'

import Divider from '../Divider/Divider'

const TabComponent = (props: CommonTabComponentProps) => {
  const {
    children,
    headingData,
    activeIndex,
    setActiveIndex,
    className = '',
    isDividerType = true,
  } = props

  return (
    <div className={`flex flex-col gap-8 ${className}`}>
      <div className="flex gap-6">
        {headingData?.map((heading, index) => {
          const {title, img = ''} = heading
          return (
            <div
              className={`flex items-center gap-1 ${activeIndex === index ? 'cursor-auto' : 'cursor-pointer'}`}
              key={title}
              onClick={() => {
                setActiveIndex(index)
              }}
            >
              {img !== '' && <img src={img} alt="error-icon" />}
              <span
                className={`text-15 border-b-2 border-solid transition-all duration-300 ease-in-out !leading-6 font-normal capitalize pb-2 ${activeIndex === index ? 'text-primary-color  border-primary-color' : 'text-text-hint-color border-transparent'}`}
              >
                {title}
              </span>
            </div>
          )
        })}
      </div>
      {isDividerType && <Divider className="!bg-info-bg-color" />}
      {children}
    </div>
  )
}

export default memo(TabComponent)
