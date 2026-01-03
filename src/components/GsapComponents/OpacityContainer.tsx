import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import {useRef} from 'react'

import {GeneralProps} from '@/types/CommonTypes'

const OpacityContainer = (
  props: Required<Pick<GeneralProps, 'children'>> &
    Pick<GeneralProps, 'className'> & {
      isVerticalPositionType?: boolean
      isStaggerType?: boolean
      isHorizontalPositionType?: boolean
    }
) => {
  const {
    children,
    isVerticalPositionType = true,
    isStaggerType = true,
    isHorizontalPositionType = false,
    className = '',
  } = props
  const containerRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return
      gsap.killTweensOf(containerRef.current)

      if (!isStaggerType) {
        gsap.fromTo(
          containerRef.current,
          {
            opacity: 0,
            y: isVerticalPositionType ? 80 : 0,
            x: isHorizontalPositionType ? 80 : 0,
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 1,
            ease: 'power2.out',
          }
        )
        return
      }

      gsap.fromTo(
        containerRef.current.children,
        {
          opacity: 0,
          y: isVerticalPositionType ? 80 : 0,
          x: isHorizontalPositionType ? 80 : 0,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          delay: 0.5,
          duration: 1,
          ease: 'power2.out',
          stagger: 1.5,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      )
    },
    {
      scope: containerRef,
      dependencies: [
        isVerticalPositionType,
        isHorizontalPositionType,
        children,
      ],
    }
  )

  return (
    <div ref={containerRef} className={`w-full h-full ${className}`}>
      {children}
    </div>
  )
}

export default OpacityContainer
