import {Constants} from '@/helpers'

import {GeneralProps} from './CommonTypes'

export interface ChallengePayoutObject {
  amount: string
  type: string
  name: string
  capital: string
}

export interface ChallengeCardObjectType {
  mainHeading: string
  subHeading: string
  content: string[]
  isUnlock: boolean
  isActive: boolean
}

export interface TradingCapitalProps {
  onPressItem: (data: ChallengePayoutObject) => void
}

export interface PayoutProps extends ChallengePayoutObject {
  status: string
  start_date: string
}

export interface ChallengeDashboardHeaderProps {
  step: number
  currentTime: string
  updatedAt: string
}

export interface ChallengeStatusCardProps {
  content: ChallengeCardObjectType[]
}

export type ChallengeCompletionCardProps = {
  totalAmount: number
}

export interface TradingDescriptionSectionProps
  extends Pick<
    GeneralProps,
    'className' | 'layoutClassName' | 'singleLineContent'
  > {
  type: keyof typeof Constants.CustomTradingStats
  isHeadingType?: boolean
}
