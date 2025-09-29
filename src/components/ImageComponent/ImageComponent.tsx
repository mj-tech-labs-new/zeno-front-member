import {forwardRef} from 'react'

import {ImageComponentProps} from '@/types/ComponentTypes'

const ImageComponent = forwardRef<HTMLDivElement, ImageComponentProps>(
  (props, ref) => {
    const {className = '', imageUrl} = props
    return (
      <div ref={ref} className={`overflow-hidden ${className}`}>
        <img
src={imageUrl} alt="error-icon"
className="w-full h-full" />
      </div>
    )
  }
)

export default ImageComponent
