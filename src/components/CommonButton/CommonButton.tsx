import {CommonButtonProps} from '@/types/ComponentTypes'

import ImageComponent from '../ImageComponent/ImageComponent'

const CommonButton = (props: CommonButtonProps) => {
  const {singleLineContent, className = '', imageUrl = '', ...rest} = props

  return (
    <button
      className={`flex items-center justify-center gap-3 p-4 rounded-lg w-full text-center cursor-pointer disabled:opacity-60 disabled:pointer-events-none !leading-6 ${className}`}
      type="button"
      {...rest}
    >
      {imageUrl !== '' && (
        <ImageComponent className="w-6 h-6" imageUrl={imageUrl} />
      )}
      {singleLineContent}
    </button>
  )
}

export default CommonButton
