import {GeneralProps} from '@/types/CommonTypes'

const ChallengeCardLayout = (
  props: Pick<GeneralProps, 'className'> &
    Required<Pick<GeneralProps, 'children'>>
) => {
  const {className = '', children} = props

  return (
    <div
      className={`p-6 rounded-2xl border border-solid border-primary-border-color w-full h-full ${className}`}
    >
      {children}
    </div>
  )
}

export default ChallengeCardLayout
