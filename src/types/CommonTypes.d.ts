/* eslint-disable import-x/no-cycle */
import {ReactNode} from 'react'

import {UserSliceInitialType} from '@/store'
import {ChartInitialPropsType} from '@/store/ChartSlice/ChartSlice'

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
  content?: string
}

export interface UserObjectType {
  name: string
  email: string
  profilePic: null | string
  reg_date: string
  isMarketer: boolean
}

export interface StorageProps {
  userData: UserSliceInitialType
  chartData: ChartInitialPropsType
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
  _id: string
  createdAt: string
  updatedAt: string
}

export interface PaginationType {
  limit: number
  page: number
  total: number
  totalPages: number
  total_all_count?: number
}

export interface DateObject {
  date1: Date | null
  date2: Date | null
}

export interface BasicApiSuccessType<T = any> {
  data: T
  status: number
  message: string
  statusCode: number
}
