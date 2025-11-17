import {memo, useMemo} from 'react'

import {HeadingComponentProps} from '@/types/ComponentTypes'

const HeadingComponent = (props: HeadingComponentProps) => {
  const {
    singleLineContent,
    className = '',
    variant = 'small',
    type = 'h1',
  } = props
  const Tag = useMemo(() => type, [type])

  return (
    <Tag
      className={`text-primary-color font-[430] font-bureau leading-9.5 ${variant === 'x-small' ? 'text-sm/5' : variant === 'small' ? 'text-lg/6' : variant === 'xxx-medium' ? 'text-xl/6' : variant === 'xx-medium' ? 'text-[22px]/6' : variant === 'x-medium' ? 'text-2xl/6' : variant === 'medium' ? 'text-4xl' : ''} ${className}`}
    >
      {singleLineContent}
    </Tag>
  )
}

export default memo(HeadingComponent)
