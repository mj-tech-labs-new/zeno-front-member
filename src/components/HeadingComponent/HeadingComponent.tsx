import {memo} from 'react'

import {HeadingComponentProps} from '@/types/ComponentTypes'

const HeadingComponent = (props: HeadingComponentProps) => {
  const {singleLineContent, className = '', variant = 'small'} = props

  return (
    <h1
      className={`text-primary-color ${variant === 'x-small' ? 'text-sm/5' : variant === 'small' ? 'text-lg/6' : variant === 'x-medium' ? 'text-2xl/6' : variant === 'medium' ? 'text-28' : ''} ${className}`}
    >
      {singleLineContent}
    </h1>
  )
}

export default memo(HeadingComponent)
