import {memo} from 'react'

import {InputContainerProps} from '@/types/ComponentTypes'

const InputContainer = (props: InputContainerProps) => {
  const {
    singleLineContent,
    className = '',
    layoutClassName = '',
    error = '',
    ...rest
  } = props

  return (
    <div className={`${layoutClassName} flex flex-col gap-2 justify-start`}>
      <label className="font-normal text-base/6 text-tertiary-color">
        {singleLineContent}
      </label>
      <div
        className={`border border-solid border-secondary-border-color rounded-lg p-4 relative ${className}`}
      >
        <input
          className="focus:outline-0 visited:outline-0 focus-within:outline-0 active:outline-0 text-secondary-light-color placeholder:text-secondary-light-color"
          {...rest}
        />
        {/* <img className=""/> */}
      </div>
      {error !== '' && (
        <span className="text-light-danger-color text-xs/6 font-normal">
          {error}
        </span>
      )}
    </div>
  )
}

export default memo(InputContainer)
