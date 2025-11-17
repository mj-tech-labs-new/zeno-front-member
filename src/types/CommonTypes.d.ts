import {ReactNode} from 'react'

// eslint-disable-next-line import-x/no-cycle
import {UserSliceInitialType} from '@/store'

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

export interface UserObjectType {
  name: string
  email: string
  profilePic: null | string
  reg_date: string
}

export interface StorageProps {
  userData: UserSliceInitialType
}

export interface FeatureProps {
  featureHeading: string
  featureSubHeading: string
  featureImageUrl: string
  featurePara: string
}

export interface FeatureCardProps {
  featureCardHeading?: string
  featureCardSubHeading: string
  featureCardImageUrl: string
  featureCardPara: string
  featureContainerHeading: string
  featureCardSpan?: string
}

export interface FeatureOptionsProps {
  featureOptions?: string[]
}

export interface FeatureOptionsLgProps {
  featureOptionsLg?: {parentId: number; content: string}[]
  // setParentIndex: () => void
  parentIndex: number
}

export interface CommonProps {
  id: number
  created_at: string
  updated_at: string
}

export interface PaginationType {
  limit: number
  page: number
  total: number
  totalPages: number
  totalCount?: number
}
