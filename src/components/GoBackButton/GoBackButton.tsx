import {useNavigate} from 'react-router-dom'

import {Images} from '@/helpers'

import ImageComponent from '../ImageComponent/ImageComponent'

const GoBackButton = () => {
  const navigate = useNavigate()
  return (
    <div
      className="cursor-pointer w-6 aspect-square"
      onClick={() => {
        navigate(-1)
      }}
    >
      <ImageComponent imageUrl={Images.backArrow} className="w-full h-full" />
    </div>
  )
}

export default GoBackButton
