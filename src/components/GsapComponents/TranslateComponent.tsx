import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import {useRef} from 'react'

import {GeneralProps} from '@/types/CommonTypes'

const TranslateComponent = (
  props: Required<Pick<GeneralProps, 'children'>> & {
    isRightType?: boolean
  }
) => {
  const {children, isRightType} = props
  const translateContainerRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      if (!translateContainerRef.current) return
      gsap.fromTo(
        translateContainerRef.current.children,
        {
          x: isRightType ? 30 : -30,
        },
        {
          x: 0,
          duration: 1.5,
          ease: 'power3.inOut',
          stagger: {
            axis: 'x',
            amount: 1.6,
          },
          scrollTrigger: {
            trigger: translateContainerRef.current,
            start: 'top 90%',
          },
        }
      )
    },
    {
      scope: translateContainerRef.current as Element,
      dependencies: [isRightType],
    }
  )

  return <div ref={translateContainerRef}>{children}</div>
}

export default TranslateComponent
