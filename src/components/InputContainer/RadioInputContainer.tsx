import {InputHTMLAttributes, memo} from 'react'

import {GeneralProps} from '@/types/CommonTypes'

const RadioInputContainer = (
  props: Pick<GeneralProps, 'className'> & InputHTMLAttributes<HTMLInputElement>
) => {
  const {className, ...rest} = props

  return <input
type="radio" {...rest}
className={`${className}`} />
}

export default memo(RadioInputContainer)
