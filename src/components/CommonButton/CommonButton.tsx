import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import {useMemo} from 'react'

import {CommonButtonProps} from '@/types/ComponentTypes'

import ImageComponent from '../ImageComponent/ImageComponent'

const CommonButton = (props: CommonButtonProps) => {
  const {
    singleLineContent,
    className = '',
    imageUrl = '',
    isAnimatedType = false,
    ...rest
  } = props

  const timeLine = useMemo(
    () => gsap.timeline({defaults: {ease: 'power3.inOut'}}),
    []
  )
  useGSAP(() => {
    if (isAnimatedType) {
      timeLine.to('#animated__btn', {
        opacity: 1,
        duration: 0.08,
      })
    }
  }, [])

  return (
    <button
      className={`flex items-center justify-center gap-3 p-4 rounded-lg w-full text-center cursor-pointer disabled:opacity-60 disabled:pointer-events-none !leading-6 ${isAnimatedType ? 'opacity-0' : ''} ${className}`}
      id="animated__btn"
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
