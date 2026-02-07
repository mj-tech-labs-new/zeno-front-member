import {CreateChallengeProps, GetCertificateProps} from './ChallengeTypes'
import {GeneralProps} from './CommonTypes'

export interface CertificateData
  extends Pick<CreateChallengeProps, 'challenge_name'>,
    Pick<GetCertificateProps, 'certificate_id'> {
  user_name: string
  date: strig
}
export interface DashboardCardProps extends Pick<GeneralProps, 'onPressItem'> {
  title: string
  content: string
  infoContent?: string
  lastRewardDay?: number
  nextRewardDay?: number
  id?: number
}
