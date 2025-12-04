import {forwardRef, memo} from 'react'

import {InputContainerProps} from '@/types/ComponentTypes'

import ImageComponent from '../ImageComponent/ImageComponent'

const InputContainer = forwardRef<HTMLInputElement, InputContainerProps>(
  (props, ref) => {
    const {
      singleLineContent = '',
      className = '',
      layoutClassName = '',
      error = '',
      imageUrl = '',
      setShowPassword,
      ...rest
    } = props

    return (
      <div className={`${layoutClassName} flex flex-col gap-2 justify-start`}>
        {singleLineContent !== '' && (
          <label
            className="font-normal text-base/6 text-tertiary-color"
            htmlFor={singleLineContent}
          >
            {singleLineContent}
          </label>
        )}
        <div
          className={`flex border border-solid border-secondary-border-color rounded-lg p-4 relative ${className}`}
        >
          <input
            ref={ref}
            className="focus:outline-0 visited:outline-0 focus-within:outline-0 active:outline-0 text-secondary-light-color placeholder:text-secondary-light-color w-full"
            {...rest}
          />
          {imageUrl !== '' && (
            <span
              className="cursor-pointer"
              onClick={() => setShowPassword?.()}
            >
              <ImageComponent className="w-6 h-6 " imageUrl={imageUrl} />
            </span>
          )}
        </div>
        {error !== '' && (
          <span className="text-light-danger-color text-xs/6 font-normal">
            {error}
          </span>
        )}
      </div>
    )
  }
)

export default memo(InputContainer)
