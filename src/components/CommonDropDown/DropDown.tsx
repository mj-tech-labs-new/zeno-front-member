import {memo, useEffect, useRef, useState} from 'react'

import {useClickOutside} from '@/hooks'
import {DropDownProps} from '@/types/ComponentTypes'

import ImageComponent from '../ImageComponent/ImageComponent'

const DropDown = (props: DropDownProps) => {
  const {className = '', dropDownData, onSelectValue, selectedValue} = props
  const mainDivRef = useRef<HTMLDivElement | null>(null)
  const dropDownStatsRef = useRef<HTMLDivElement | null>(null)
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)

  useEffect(() => {
    if (
      dropDownData?.length === 0 ||
      !mainDivRef.current ||
      !dropDownStatsRef.current ||
      !isDropDownOpen
    )
      return

    const {top, left, height, width} =
      mainDivRef.current.getBoundingClientRect()
    dropDownStatsRef.current.style.top = `${top + height}px`
    dropDownStatsRef.current.style.left = `${left}px`
    dropDownStatsRef.current.style.width = `${width}px`
  }, [dropDownData?.length, isDropDownOpen])

  useClickOutside({
    refs: [mainDivRef],
    onClickOutside() {
      setIsDropDownOpen(false)
    },
  })

  return (
    <div
      ref={mainDivRef}
      className={`pl-4 pr-3 py-3 bg-landing-page-trading-rules-para-text rounded-lg cursor-pointer ${className}`}
      onClick={() => {
        setIsDropDownOpen((data) => !data)
      }}
    >
      <div className="flex items-center gap-1">
        <span className="text-tertiary-color text-sm font-normal hover:bg-secondary-light-color hover:text-white transition-all duration-500 ease-in-out">
          {selectedValue?.title}
        </span>
        {selectedValue?.img && selectedValue?.img !== '' ? (
          <ImageComponent className="w-5 h-5" imageUrl={selectedValue.img} />
        ) : null}
      </div>
      {isDropDownOpen ? (
        <div
          ref={dropDownStatsRef}
          className="fixed bg-chart-secondary-bg-color shadow-md z-20 rounded-lg overflow-y-auto h-56"
        >
          {dropDownData?.map((data) => {
            const {title, img = ''} = data
            return (
              <div
                key={title}
                className="flex items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation()
                  onSelectValue(data)
                  setIsDropDownOpen((prev) => !prev)
                }}
              >
                <span className="text-tertiary-color text-sm font-normal p-3  w-full hover:bg-secondary-light-color hover:text-white transition-all duration-500 ease-in-out">
                  {title}
                </span>
                {img !== '' && (
                  <ImageComponent className="w-5 h-5" imageUrl={img} />
                )}
              </div>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export default memo(DropDown)
