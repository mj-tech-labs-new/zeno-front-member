import {InputHTMLAttributes, memo} from 'react'

import {English} from '@/helpers'
import {GeneralProps} from '@/types/CommonTypes'

const CheckBoxInputContainer = (
  props: Pick<GeneralProps, 'className' | 'singleLineContent'> &
    InputHTMLAttributes<HTMLInputElement>
) => {
  const {className, singleLineContent, ...rest} = props

  return (
    <div className="flex items-center gap-3">
      <input
        id={singleLineContent}
        type="checkbox"
        {...rest}
        className={`${className} appearance-auto size-6.5 border border-neutral-active-color rounded-[4px] check`}
      />
      <label htmlFor={singleLineContent}>{English.E298}</label>
    </div>
  )
}

export default memo(CheckBoxInputContainer)
