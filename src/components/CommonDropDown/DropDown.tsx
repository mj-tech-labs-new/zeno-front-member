import {forwardRef, memo, useEffect, useRef, useState} from 'react'

import {English, Images} from '@/helpers'
import {useClickOutside} from '@/hooks'
import {DropDownProps} from '@/types/ComponentTypes'

import ImageComponent from '../ImageComponent/ImageComponent'
import SearchComponent from '../SearchComponent/SearchComponent'

const DropDown = forwardRef<HTMLDivElement, DropDownProps>((props, ref) => {
  const {
    className = '',
    dropDownData,
    onSelectValue,
    selectedValue,
    layoutClassName = '',
    headingClassName = '',
    showArrows = true,
    elementId = [],
    isSearchType = false,
    searchValue = '',
    setSearchValue,
    onPressSearch,
  } = props
  const mainDivRef = useRef<HTMLDivElement | null>(null)
  const searchRef = useRef<HTMLDivElement | null>(null)
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
    refs: [mainDivRef, searchRef],
    onClickOutside() {
      setIsDropDownOpen(false)
    },
  })

  useEffect(() => {
    if (!isDropDownOpen) return
    const handleScroll = () => {
      setIsDropDownOpen(false)
    }
    elementId?.forEach((elementItem) => {
      const element = document.getElementById(elementItem) ?? window
      element.addEventListener('scroll', handleScroll)
    })

    // eslint-disable-next-line consistent-return
    return () => {
      elementId?.forEach((elementItem) => {
        const element = document.getElementById(elementItem) ?? window
        element.removeEventListener('scroll', handleScroll)
      })
    }
  }, [elementId, isDropDownOpen])

  return (
    <div
      ref={mainDivRef ?? ref}
      className={`pl-4 pr-3 py-3 border-2 border-neutral-secondary-color !z-100 rounded-lg cursor-pointer ${className}`}
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        setIsDropDownOpen((data) => !data)
      }}
    >
      <div className="flex justify-between items-center gap-1">
        <span
          className={`text-tertiary-color text-sm font-normal hover:bg-secondary-light-color hover:text-white transition-all duration-500 ease-in-out  ${headingClassName}`}
        >
          {selectedValue?.title}
        </span>
        {selectedValue?.img && selectedValue?.img !== '' ? (
          <ImageComponent className="w-5 h-5" imageUrl={selectedValue.img} />
        ) : null}

        {showArrows && (
          <ImageComponent
            className={`${isDropDownOpen ? 'rotate-180' : ''} transition-all duration-200 ease-in-out`}
            imageUrl={Images.dropdownArrow}
          />
        )}
      </div>
      {isDropDownOpen ? (
        <div
          ref={dropDownStatsRef}
          className={`fixed bg-chart-dropdown-bg-color shadow-md z-[999] rounded-lg  h-56  ${layoutClassName}`}
        >
          {isSearchType && (
            <div className="p-2">
              <SearchComponent
                ref={searchRef}
                showCross
                onPressSearch={onPressSearch}
                placeholder={English.E372}
                searchValue={searchValue}
                setSearchValue={(value) => {
                  setSearchValue?.(value)
                }}
              />
            </div>
          )}
          <div
            className={` overflow-y-auto bg-chart-dropdown-bg-color shadow-md z-[999] ${isSearchType ? 'h-[calc(100%-40px)]' : 'h-full'}`}
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
        </div>
      ) : null}
    </div>
  )
})

export default memo(DropDown)
