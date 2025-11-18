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
    type = 'lineType',
    layoutClassName = '',
    isCorruptedTabIndex = '',
  } = props

  return (
    <div className={`flex flex-col gap-8 ${className} `}>
      <div className="flex gap-6 w-full">
        {headingData?.map((heading, index) => {
          const {title, img = ''} = heading
          return (
            <div
              key={title}
              className={`flex items-center gap-1 font-dmsans ${activeIndex === index ? 'cursor-auto' : 'cursor-pointer'}`}
              onClick={() => {
                if (isCorruptedTabIndex === index) return
                setActiveIndex(index)
              }}
            >
              {img !== '' && <img alt="error-icon" src={img} />}
              <span
                className={`text-neutral-primary-color ${className} ${type === 'lineType' ? 'border-b-2 border-solid text-15 !leading-6 font-normal' : 'border-none px-3 py-1.5 rounded-full text-sm !leading-4 font-bold'}  transition-all duration-300 ease-in-out   capitalize pb-2 ${activeIndex === index && type === 'lineType' ? `text-primary-color  border-primary-color ${layoutClassName}` : 'text-text-hint-color border-transparent'} ${activeIndex === index && type === 'buttonType' ? 'bg-neutral-active-color !text-chart-text-primary-color' : 'bg-transparent'} `}
              >
                {title}
              </span>
            </div>
          )
        })}
      </div>
      {isDividerType ? <Divider className="!bg-info-bg-color" /> : null}
      {children}
    </div>
  )
}

export default memo(TabComponent)
