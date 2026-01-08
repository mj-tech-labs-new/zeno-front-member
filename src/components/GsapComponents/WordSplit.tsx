import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import {ScrollTrigger, SplitText} from 'gsap/all'
import {memo, useRef} from 'react'

import {GeneralProps} from '@/types/CommonTypes'

gsap.registerPlugin(ScrollTrigger, SplitText)

type WordProps = Pick<GeneralProps, 'singleLineContent' | 'multilineContent'> &
  Pick<GeneralProps, 'className'> & {isOnceType?: boolean}

const WordSplit = ({
  singleLineContent,
  multilineContent,
  className = '',
  isOnceType = false,
}: WordProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return

      const split = new SplitText(containerRef.current, {
        type: 'words',
      })

      const tl = gsap.timeline({
        paused: true,
        defaults: {ease: 'power3.inOut'},
      })

      tl.set(containerRef.current, {opacity: 1}).from(split.words, {
        opacity: 0,
        yPercent: 50,
        duration: 1.5,
        ease: 'back.out(1.7)',
        stagger: 0.12,
      })

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 90%',
        once: isOnceType,
        onEnter: () => {
          tl.restart()
        },
        onEnterBack: () => {
          tl.restart()
        },
        onLeave: () => tl.pause(0),
        onLeaveBack: () => tl.pause(0),
      })

      // eslint-disable-next-line consistent-return
      return () => {
        split.revert()
      }
    },
    {scope: containerRef}
  )

  return (
    <div
      ref={containerRef}
      className={`text-primary-color font-medium font-geist! text-[40px]/12 opacity-0 ${className}`}
    >
      {singleLineContent !== '' && <p>{singleLineContent}</p>}

      {multilineContent?.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
  )
}

export default memo(WordSplit)
