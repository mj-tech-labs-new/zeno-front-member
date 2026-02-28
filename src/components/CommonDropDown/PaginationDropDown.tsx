import React, {memo, useEffect, useRef, useState} from 'react'

import {Images} from '@/helpers'
import {PaginationDropDownProps} from '@/types/ComponentTypes'

import useClickOutside from '../../hooks/useClickOutside'
import ImageComponent from '../ImageComponent/ImageComponent'

const PaginationDropDown = (props: PaginationDropDownProps) => {
  const {
    dropDownData,
    onSelectValue,
    selectedValue,
    className = '',
    placeHolderText,
    labelText = '',
    isTopType,
  } = props
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const mainDivRef = useRef<HTMLDivElement | null>(null)
  const dropDownRef = useRef<HTMLDivElement | null>(null)

  useClickOutside({
    refs: [mainDivRef, dropDownRef],
    onClickOutside: () => {
      setIsDropDownOpen(false)
    },
  })

  useEffect(() => {
    if (
      dropDownData?.length === 0 ||
      !isDropDownOpen ||
      !mainDivRef.current ||
      !dropDownRef.current
    )
      return

    const {top, left, width, height} =
      mainDivRef.current.getBoundingClientRect()
    const styleDiv = dropDownRef.current.style
    styleDiv.left = `${left}px`
    styleDiv.top = `${isTopType ? top - (108 + height) : top + height}px`
    styleDiv.width = `${width}px`
  }, [dropDownData?.length, isDropDownOpen, isTopType])

  return (
    <React.Fragment>
      {labelText !== '' && (
        <label
          className="text_13_utility text-primary-color"
          htmlFor={labelText}
        >
          {labelText}
        </label>
      )}
      <div
        ref={mainDivRef}
        className={`h-10 cursor-pointer bg-landing-page-trading-rules-para-text px-4 rounded-lg flex gap-2 w-full items-center flex-1 ${className}`}
        onClick={(e) => {
          e.stopPropagation()
          setIsDropDownOpen((data) => !data)
        }}
      >
        <span className="text-tertiary-color inline-block w-full whitespace-nowrap text_13_utility">
          {selectedValue?.title === '' ? placeHolderText : selectedValue?.title}
        </span>
        <ImageComponent
          className={`size-4! flex items-center justify-center [&>img]:h-2 transition-all duration-300 ease-linear ${isDropDownOpen ? 'rotate-180' : ''}`}
          imageUrl={Images.dropdownArrow}
        />
      </div>
      {isDropDownOpen ? (
        <div
          ref={dropDownRef}
          className="flex flex-col max-h-32 overflow-y-auto bg-light-gray-400 text-black-dark-500 gap-3 last:border-0   fixed rounded-lg"
        >
          {dropDownData?.map((item) => {
            const {title, img = ''} = item
            return (
              <div
                key={title}
                className="flex *:text_13_utility items-center cursor-pointer hover:bg-info-bg-color transition-all duration-300 ease-linear gap-2 h-10 "
                onClick={(e) => {
                  e.stopPropagation()
                  onSelectValue(item)
                  setIsDropDownOpen(false)
                }}
              >
                <span className="px-4 text-primary-color">{title}</span>
                {img !== '' && (
                  <ImageComponent className="size-4!" imageUrl={img} />
                )}
              </div>
            )
          })}
        </div>
      ) : null}
    </React.Fragment>
  )
}

export default memo(PaginationDropDown)
