import {CreateChallengeProps, GetCertificateProps} from './ChallengeTypes'

export interface CertificateData
  extends Pick<CreateChallengeProps, 'challenge_name'>,
    Pick<GetCertificateProps, 'certificate_id'> {
  user_name: string
  date: strig
}
