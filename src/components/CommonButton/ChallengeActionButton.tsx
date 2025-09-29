import {useNavigate} from 'react-router-dom'

import {CommonButton} from '@/components'
import {English} from '@/helpers'
import {GeneralProps} from '@/types/CommonTypes'

const ChallengeActionButton = (props: Pick<GeneralProps, 'className'>) => {
  const {className = ''} = props
  const navigate = useNavigate()
  return (
    <CommonButton
      singleLineContent={English.E19}
      className={`light-danger-btn-type !w-fit mx-auto ${className}`}
      onClick={() => {
        navigate('/create-challenge')
      }}
    />
  )
}

export default ChallengeActionButton
