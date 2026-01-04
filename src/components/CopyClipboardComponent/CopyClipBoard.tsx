import {forwardRef, useEffect, useState} from 'react'
import {toast} from 'react-toastify'

import {English, Images} from '@/helpers'
import {CopyClipBoardProps} from '@/types/ComponentTypes'

import BasicSkeleton from '../SkeletonComponents/BasicSkeleton'

const CopyClipBoard = forwardRef<HTMLDivElement, CopyClipBoardProps>(
  (props, ref) => {
    const [isLoading, setIsLoading] = useState(true)
    const {
      className = '',
      imageUrl,
      imageType = 'normal_type',
      imageRelatedText = '',
      onPressItem,
      type,
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
      type !== '' && (
        <div
          ref={ref}
          className={` ${className}`}
          onClick={(e) => {
            e.stopPropagation()
            onPressItem?.()
            if (imageUrl === Images.copy) {
              toast.info(English.E232)
              window.navigator.clipboard.writeText(imageRelatedText)
            }
          }}
        >
          {isLoading ? (
            <BasicSkeleton />
          ) : type === 'text' ? (
            <div>{imageRelatedText}</div>
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

export default CopyClipBoard
