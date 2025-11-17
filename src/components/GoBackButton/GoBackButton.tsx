import {useNavigate} from 'react-router-dom'

import {Images} from '@/helpers'
import {GeneralProps} from '@/types/CommonTypes'

import ImageComponent from '../ImageComponent/ImageComponent'

const GoBackButton = (props: Pick<GeneralProps, 'className'>) => {
  const navigate = useNavigate()
  const {className = ''} = props
  return (
    <div
      className="cursor-pointer w-6 aspect-square flex items-center"
      onClick={() => {
        navigate(-1)
      }}
    >
      <ImageComponent
        className={`w-full h-full ${className}`}
        imageUrl={Images.backArrow}
      />
    </div>
  )
}

export default GoBackButton
