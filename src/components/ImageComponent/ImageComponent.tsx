import {forwardRef, useEffect, useState} from 'react'
import {toast} from 'react-toastify'

import {English, Images} from '@/helpers'
import {ImageComponentProps} from '@/types/ComponentTypes'

import BasicSkeleton from '../SkeletonComponents/BasicSkeleton'

const ImageComponent = forwardRef<HTMLDivElement, ImageComponentProps>(
  (props, ref) => {
    const [isLoading, setIsLoading] = useState(true)
    const {
      className = '',
      imageUrl,
      imageType = 'normal_type',
      imageRelatedText = '',
    } = props
    const [imageContent, setImageContent] = useState('')
    useEffect(() => {
      setIsLoading(true)
      const newImage = new Image()
      newImage.src = imageUrl
      newImage.onload = () => {
        setIsLoading(false)
        setImageContent(imageUrl)
      }

      newImage.onerror = () => {
        setIsLoading(false)
        setImageContent(
          imageType === 'normal_type' ? '' : Images.placeholderUser
        )
      }
    }, [imageType, imageUrl])

    return (
      imageContent !== '' && (
        <div
          ref={ref}
          className={`overflow-hidden ${className}`}
          onClick={() => {
            if (imageUrl === Images.copy) {
              toast.info(English.E232)
              window.navigator.clipboard.writeText(imageRelatedText)
            }
          }}
        >
          {isLoading ? (
            <BasicSkeleton />
          ) : (
            <img
              alt="error-icon"
              className="w-full h-full"
              src={imageContent}
            />
          )}
        </div>
      )
    )
  }
)

export default ImageComponent
