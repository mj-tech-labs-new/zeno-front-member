import {useNavigate} from 'react-router-dom'

import {Images} from '@/helpers'
import {GeneralProps} from '@/types/CommonTypes'

import ImageComponent from '../ImageComponent/ImageComponent'

const GoBackButton = (props: Pick<GeneralProps, 'className'>) => {
  const navigate = useNavigate()
  const {className = ''} = props
  return (
    <ImageComponent
      className={`cursor-pointer w-6 aspect-square flex items-center ${className}`}
      imageUrl={Images.backArrow}
      onPressItem={() => {
        navigate(-1)
      }}
    />
  )
}

export default GoBackButton
