import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import React, {useCallback, useEffect, useMemo, useRef} from 'react'

import {ImageComponent} from '@/components'
import {Images} from '@/helpers'
import {useClickOutside} from '@/hooks'

import NavItems from './NavItems'

const NavvButton = () => {
  const toggleButtonRef = useRef<HTMLDivElement | null>(null)
  const performAnimationRef = useRef(false)
  const timeLine = useMemo(() => gsap.timeline(), [])
  useGSAP(() => {
    timeLine.to('#nav__overlay', {
      x: 0,
      duration: 0.1,
      ease: 'power2.inOut',
    })
    timeLine.from('.stagger_item', {
      opacity: 0,
      duration: 0.5,
      ease: 'power3.out',
    })
    timeLine.to('.stagger_item', {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 0.03,
      stagger: {
        amount: 1,
        axis: 'y',
        grid: 'auto',
        from: 'start',
      },
      ease: 'power3.inOut',
    })
    gsap.globalTimeline.resume()
  }, [])

  const onCloseDiv = useCallback(() => {
    timeLine.reverse()
  }, [timeLine])

  const handleInitialTimeLine = useCallback(() => {
    if (window.innerWidth < 1024) {
      timeLine.pause()
    }
  }, [timeLine])
  useEffect(() => {
    handleInitialTimeLine()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleInitialTimeLine)
    return () => {
      window.removeEventListener('resize', handleInitialTimeLine)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useClickOutside({
    refs: [toggleButtonRef],
    onClickOutside() {
      if (performAnimationRef.current) {
        gsap.globalTimeline.resume()
        onCloseDiv()
      }
    },
  })

  return (
    <React.Fragment>
      <ImageComponent
        ref={toggleButtonRef}
        className="[&>img]:white_filter block lg:hidden size-8"
        imageUrl={Images.menu}
        onPressItem={() => {
          timeLine.play()
          performAnimationRef.current = true
        }}
      />
      <div
        className="fixed translate-x-full inset-0 min-h-screen w-screen bg-black/40 backdrop-blur-lg z-[99999] isolation-isolate will-change-transform"
        id="nav__overlay"
      >
        <ImageComponent
          className="[&>img]:white_filter absolute right-5 top-5 w-5"
          imageUrl={Images.crossIcon}
          onPressItem={onCloseDiv}
        />
        <NavItems
          key="new"
          animationClass="translate-y-0!"
          className="flex! flex-col [&>div]:first:flex-col! pt-12 pb-8"
          layoutClassName="w-full justify-between"
          onPressItem={onCloseDiv}
          showLogo={false}
        />
      </div>
    </React.Fragment>
  )
}

export default NavvButton
