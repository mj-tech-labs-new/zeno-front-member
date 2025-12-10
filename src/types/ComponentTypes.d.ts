import {ButtonHTMLAttributes, InputHTMLAttributes} from 'react'
import {Swiper, SwiperOptions} from 'swiper/types'

import {Constants} from '@/helpers'

import {
  ChallengeCompletionCardProps,
  CloseOrderButtonProps,
} from './ChallengeTypes'
import type {DropDownObjectType, GeneralProps} from './CommonTypes'
import {
  HeadingComponentType,
  HeadingComponentVariant,
  ImageType,
  ListingComponentsType,
  MaxOpenAndMarginType,
  TabComponentType,
} from './UnionTypes'

export type ImageComponentProps = Pick<GeneralProps, 'className'> &
  Required<Pick<GeneralProps, 'imageUrl'>> & {imageType?: ImageType} & {
    imageRelatedText?: string
  }
export interface RangeSelectorProps extends Pick<GeneralProps, 'className'> {
  rangeValue: number
  setRangeValue: (arg: number) => void
  sliderWidth?: number
  rangeClassname?: string
}

export type InputContainerProps = InputHTMLAttributes<HTMLInputElement> &
  Pick<GeneralProps, 'className' | 'layoutClassName' | 'imageUrl'> &
  Pick<GeneralProps, 'singleLineContent'> & {
    error?: string
    onPressIcon?: () => void
  }

export type CommonButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  Required<Pick<GeneralProps, 'singleLineContent'>> &
  Pick<GeneralProps, 'className' | 'imageUrl'>

export type HeadingComponentProps = Pick<GeneralProps, 'className'> &
  Required<Pick<GeneralProps, 'singleLineContent'>> & {
    variant?: HeadingComponentVariant
    type?: HeadingComponentType
  }

export type CreatChallengeCardType = Pick<
  GeneralProps,
  'className' | 'onPressItem'
> &
  Required<Pick<GeneralProps, 'singleLineContent' | 'multilineContent'>>

export type AccordianPropsType = Required<
  Pick<GeneralProps, 'multilineContent'>
> &
  Pick<GeneralProps, 'className' | 'singleLineContent' | 'layoutClassName'> & {
    isDirectType?: boolean
  }

export type CircularProgressBarType = {
  usedBalance: number | null
} & Pick<GeneralProps, 'className'> &
  Pick<ChallengeCompletionCardProps, 'totalAmount'>

export interface StatsCardProps
  extends Pick<GeneralProps, 'className' | 'layoutClassName'> {
  headingContent: string
  initialContent: number
  secondContent: number
  thirdContent?: number
  infoContent: string
  type: string
}

export interface DropDownProps
  extends Pick<GeneralProps, 'className' | 'layoutClassName'>,
    Pick<CommonTableComponentProps, 'showArrows'> {
  dropDownData: DropDownObjectType[]
  selectedValue: DropDownObjectType
  headingClassName?: string
  onSelectValue: (data: DropDownObjectType) => void
  elementId?: string[]
}

export interface MaxOpenAndMarginProps {
  type: MaxOpenAndMarginType
  totalStr: string
  totalNum: number
}

export interface DatePickerProps extends Pick<GeneralProps, 'className'> {
  selectedDate1: Date
  selectedDate2?: Date | null
  isPortalType?: boolean
  placeHolder?: string
  dateFormate?: string
  onSelectDate: (data: [Date | null, Date | null]) => void
  showIcon?: boolean
  minDate?: Date
}

export interface CommonTableComponentProps
  extends Required<Pick<GeneralProps, 'children'>>,
    Pick<GeneralProps, 'className' | 'layoutClassName' | 'imageUrl'>,
    Pick<CloseOrderButtonProps, 'onPerformAction'>,
    Pick<CloseOrderButtonProps, 'apiMethod'> {
  tableHeading: {content: string[]; showArrow: boolean}[]
  content?: string
  showArrows?: boolean
  headingClassName?: string
  ChangeOrder?: (arg: string) => void
  extraProp?: Record<string, string>
  showLoader?: boolean
}

export interface CommonTabComponentProps
  extends Required<Pick<GeneralProps, 'children'>>,
    Pick<GeneralProps, 'className' | 'layoutClassName'> {
  headingData: DropDownObjectType[]
  activeIndex: number
  setActiveIndex: (value: number) => void
  isDividerType?: boolean
  type?: TabComponentType
  isCorruptedTabIndex?: number
}

export interface AppLoaderRef {
  showLoader: (state: boolean) => void
}

export interface RangeSliderProps {
  value: number
  setValue: (value: number) => void
}

export interface SwiperComponentProps
  extends Required<Pick<GeneralProps, 'children'>>,
    Pick<GeneralProps, 'className'> {
  isPaginationType?: boolean
  slidesPerView?: SwiperOptions['slidesPerView']
  spaceBetween?: SwiperOptions['spaceBetween']
  isMouseWheelType?: boolean
  onSlideChange?: (swiper: Swiper) => void
  isAutoPlayType?: boolean
}

export interface ContentCarouselCardType
  extends Required<
    Pick<GeneralProps, 'singleLineContent' | 'multilineContent' | 'imageUrl'>
  > {
  items: {
    title: string
    content: string
  }[]
  userName: string
  userImg: string
  userInfo: string
}

export type CardCarouselType =
  | ({
      type: 'imageType'
      data: Required<Pick<GeneralProps, 'imageUrl'>>
    } & Pick<GeneralProps, 'className' | 'layoutClassName'>)
  | ({
      type: 'contentType'
      data: ContentCarouselCardType
    } & Pick<GeneralProps, 'className' | 'layoutClassName'>)

export type ListComponentProps = {
  type: ListingComponentsType
} & Pick<GeneralProps, 'className' | 'singleLineContent'>

export interface ModalComponentProps
  extends Required<Pick<GeneralProps, 'children'>>,
    Pick<GeneralProps, 'className' | 'singleLineContent'> {
  showCross?: boolean
  onPressButton?: (state: boolean) => void
}

export interface FeatureComponentProps {
  item: (typeof Constants.featuresWholeArray)[0]
  setCalculatedHeight: (height: number) => void
  parentId: number
}
export interface BasicPaginatinProps {
  total: number
  onSelectPage: (value: number) => void
}

export interface MarginAndAssetProps {
  account_balance?: number
  available_balance?: number
  available_margin?: number
  total_balance?: number
  used_margin?: number
  unreleased_profit?: number
}

export interface DashboardTableComponentProps
  extends Pick<
      GeneralProps,
      'className' | 'layoutClassName' | 'singleLineContent'
    >,
    Pick<DropDownProps, 'headingClassName'> {
  data: []
}
