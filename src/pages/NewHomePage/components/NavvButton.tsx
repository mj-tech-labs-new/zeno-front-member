import {useRef, useState} from 'react'

import {ImageComponent} from '@/components'
import {Images} from '@/helpers'
import {useClickOutside} from '@/hooks'

import NavItems from './NavItems'

const NavvButton = () => {
  const toggleButtonRef = useRef<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  // useGSAP(() => {
  //   timeLine.to('#nav__overlay', {
  //     x: 0,
  //     duration: 0.1,
  //     ease: 'power2.inOut',
  //   })
  //   timeLine.from('.stagger_item', {
  //     opacity: 0,
  //     duration: 0.5,
  //     ease: 'power3.out',
  //   })
  //   timeLine.to('.stagger_item', {
  //     x: 0,
  //     y: 0,
  //     opacity: 1,
  //     duration: 0.03,
  //     stagger: {
  //       amount: 1,
  //       axis: 'y',
  //       grid: 'auto',
  //       from: 'start',
  //     },
  //     ease: 'power3.inOut',
  //   })
  //   gsap.globalTimeline.resume()
  // }, [])

  useClickOutside({
    refs: [toggleButtonRef],
    onClickOutside() {
      setIsOpen(false)
    },
  })

  return !isOpen ? (
    <ImageComponent
      ref={toggleButtonRef}
      className="[&>img]:white_filter block lg:hidden size-8 cursor-pointer"
      imageUrl={Images.menu}
      onPressItem={() => {
        setIsOpen(true)
      }}
    />
  ) : (
    <div className="h-screen w-screen bg-primary-black/50 backdrop-blur-lg absolute inset-0">
      <ImageComponent
        className="[&>img]:white_filter absolute right-5 top-5 w-5 cursor-pointer"
        imageUrl={Images.crossIcon}
        onPressItem={() => {
          setIsOpen(false)
        }}
      />
      <NavItems
        key="new"
        animationClass="translate-y-0!"
        className="flex! flex-col [&>div]:first:flex-col! pt-12 pb-8"
        layoutClassName="w-full justify-between"
        showLogo={false}
        onPressItem={() => {
          setIsOpen(false)
        }}
      />
    </div>
  )
}

export default NavvButton
