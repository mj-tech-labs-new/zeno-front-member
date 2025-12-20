import {forwardRef, memo} from 'react'

import {Images} from '@/helpers'
import {SearchComponentProps} from '@/types/ComponentTypes'

import ImageComponent from '../ImageComponent/ImageComponent'

const SearchComponent = forwardRef<HTMLDivElement, SearchComponentProps>(
  (props, ref) => {
    const {
      searchValue,
      setSearchValue,
      className = '',
      layoutClassName = '',
      showCross = true,
      onPressSearch,
      ...rest
    } = props
    return (
      <div
        ref={ref}
        className={`flex h-10 justify-between items-center px-4 gap-5 bg-chart-layout-bg text-secondary-light-color w-full border border-neutral-secondary-color rounded-md ${className}`}
      >
        <ImageComponent
          className="size-5"
          imageUrl={Images.searchIcon}
          onPressItem={() => {
            onPressSearch?.(searchValue)
          }}
        />
        <input
          className={`h-full w-full outline-none focus:outline-none active:outline-none  ${layoutClassName}`}
          value={searchValue}
          onChange={(e) => {
            e.stopPropagation()
            setSearchValue(e.target.value)
          }}
          onClick={(e) => {
            e.stopPropagation()
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onPressSearch?.(searchValue)
            }
          }}
          {...rest}
        />

        {showCross && searchValue !== '' && (
          <ImageComponent
            className="[&>img]:white_filter"
            imageUrl={Images.crossIcon}
            onPressItem={() => {
              setSearchValue('')
              onPressSearch?.('')
            }}
          />
        )}
      </div>
    )
  }
)

export default memo(SearchComponent)
