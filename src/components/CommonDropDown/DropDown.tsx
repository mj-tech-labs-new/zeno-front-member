import {memo} from 'react'

import {DropDownProps} from '@/types/ComponentTypes'

import ImageComponent from '../ImageComponent/ImageComponent'

const DropDown = (props: DropDownProps) => {
  const {className = '', dropDownData, onSelectValue, selectedValue} = props
  return (
    <div
      className={`pl-4 pr-3 py-3 bg-dropdown-bg-color rounded-lg ${className}`}
    >
      <div className="flex items-center gap-1">
        <span className="text-tertiary-color text-sm font-normal hover:bg-secondary-light-color hover:text-white transition-all duration-500 ease-in-out">
          {selectedValue?.title}
        </span>
        {selectedValue?.img && selectedValue?.img !== '' && (
          <ImageComponent imageUrl={selectedValue.img} className="w-5 h-5" />
        )}
      </div>
      <div className="fixed bg-white shadow-md rounded-2xl">
        {dropDownData?.map((dropDownData) => {
          const {title, img = ''} = dropDownData
          return (
            <div
              className="flex items-center gap-1"
              key={title}
              onClick={(e) => {
                e.stopPropagation()
                onSelectValue(dropDownData)
              }}
            >
              <span className="text-tertiary-color text-sm font-normal hover:bg-secondary-light-color hover:text-white transition-all duration-500 ease-in-out">
                {title}
              </span>
              {img !== '' && (
                <ImageComponent imageUrl={img} className="w-5 h-5" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default memo(DropDown)
