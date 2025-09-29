import {ReactNode} from 'react'

export interface GeneralProps {
  className?: string
  imageUrl?: string
  multilineContent?: string[]
  singleLineContent?: string
  layoutClassName?: string
  onPressItem?: () => void
  children?: ReactNode
}

export interface DropDownObjectType {
  img?: string
  title: string
}
