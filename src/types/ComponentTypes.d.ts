import {ButtonHTMLAttributes, InputHTMLAttributes} from 'react'

import {ChallengeCompletionCardProps} from './ChallengeTypes'
import type {DropDownObjectType, GeneralProps} from './CommonTypes'
import {HeadingComponentVariant, StatsCardType} from './UnionTypes'

export type ImageComponentProps = Pick<GeneralProps, 'className'> &
  Required<Pick<GeneralProps, 'imageUrl'>>

export type InputContainerProps = InputHTMLAttributes<HTMLInputElement> &
  Pick<GeneralProps, 'className' | 'layoutClassName' | 'imageUrl'> &
  Required<Pick<GeneralProps, 'singleLineContent'>> & {error?: string}

export type CommonButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  Required<Pick<GeneralProps, 'singleLineContent'>> &
  Pick<GeneralProps, 'className' | 'imageUrl'>

export type HeadingComponentProps = Pick<GeneralProps, 'className'> &
  Required<Pick<GeneralProps, 'singleLineContent'>> & {
    variant?: HeadingComponentVariant
  }

export type CreatChallengeCardType = Pick<
  GeneralProps,
  'className' | 'onPressItem'
> &
  Required<Pick<GeneralProps, 'singleLineContent' | 'multilineContent'>>

export type AccordianPropsType = Required<
  Pick<GeneralProps, 'multilineContent'>
> &
  Pick<GeneralProps, 'className' | 'singleLineContent'> & {
    isDirectType?: boolean
  }

export type CircularProgressBarType = {
  usedBalance: number
} & Pick<GeneralProps, 'className'> &
  Pick<ChallengeCompletionCardProps, 'totalAmount'>

export interface StatsCardProps extends Pick<GeneralProps, 'className'> {
  headingContent: string
  initialContent: string
  secondContent?: string
  infoContent: string
  type: StatsCardType
  subType?: string
  isProgressBarType?: boolean
}

export interface DropDownProps extends Pick<GeneralProps, 'className'> {
  dropDownData: DropDownObjectType[]
  selectedValue: DropDownObjectType
  onSelectValue: (data: DropDownObjectType) => void
}

export interface DatePickerProps extends Pick<GeneralProps, 'className'> {
  selectedDate1: Date
  selectedDate2?: Date
  onSelectDate: (data: [Date | null, Date | null]) => void
}

export interface CommonTableComponentProps
  extends Required<Pick<GeneralProps, 'children'>> {
  tableHeading: string[]
}

export interface CommonTabComponentProps
  extends Required<Pick<GeneralProps, 'children'>>,
    Pick<GeneralProps, 'className'> {
  headingData: DropDownObjectType[]
  activeIndex: number
  setActiveIndex: (value: number) => void
  isDividerType?: boolean
}

export interface AppLoaderRef {
  showLoader: (state: boolean) => void
}
