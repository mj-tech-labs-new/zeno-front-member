import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/all'
import {forwardRef, useRef} from 'react'

import {FeatureCardProps, GeneralProps} from '@/types/CommonTypes'

const DescriptionComponent = forwardRef<
  HTMLDivElement,
  Pick<
    GeneralProps,
    'className' | 'multilineContent' | 'layoutClassName' | 'singleLineContent'
  > &
    Pick<FeatureCardProps, 'featureCardSpan'> & {isAnimationType?: boolean}
>((props, ref) => {
  const {
    className = '',
    multilineContent = [],
    singleLineContent = '',
    featureCardSpan = '',
    layoutClassName = '',
    isAnimationType = false,
  } = props
  const divElement = useRef<HTMLDivElement | null>(null)

  gsap.registerPlugin(ScrollTrigger)

  useGSAP(
    () => {
      if (isAnimationType) {
        gsap.to(divElement.current, {
          opacity: 100,
          ease: 'power2.in',
          duration: 2,
          scrollTrigger: {
            trigger: divElement.current,
            start: 'bottom bottom',
            end: 'top 20%',
            scrub: true,
          },
        })
      }
    },
    {scope: divElement.current as Element, dependencies: [isAnimationType]}
  )

  return (
    <div
      ref={ref ?? divElement}
      className={` ${isAnimationType ? 'opacity-0' : ''} ${layoutClassName}`}
    >
      {multilineContent?.length > 0 &&
        multilineContent.map((item) => (
          <p
            key={item}
            className={`text-text-hint-color font-bureau leading-7 text-15 ${className}`}
          >
            {item}
          </p>
        ))}

      {singleLineContent?.length > 0 && (
        <p className={`text-text-hint-color text-15 ${className} md:w-full`}>
          {singleLineContent}
          {featureCardSpan && (
            <span className="text-primary-black text-15">
              {featureCardSpan}
            </span>
          )}
        </p>
      )}
    </div>
  )
})

export default DescriptionComponent
