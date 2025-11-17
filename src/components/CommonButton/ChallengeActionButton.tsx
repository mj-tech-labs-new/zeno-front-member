import {useNavigate} from 'react-router-dom'

import {English, Images} from '@/helpers'
import {GeneralProps} from '@/types/CommonTypes'

import CommonButton from './CommonButton'

const ChallengeActionButton = (props: Pick<GeneralProps, 'className'>) => {
  const {className = ''} = props
  const navigate = useNavigate()
  return (
    <CommonButton
      className={`light-danger-btn-type !w-fit mx-auto ${className}`}
      imageUrl={Images.plusIconRoundedBorder}
      singleLineContent={English.E19}
      onClick={() => {
        navigate('/create-challenge')
      }}
    />
  )
}

export default ChallengeActionButton
