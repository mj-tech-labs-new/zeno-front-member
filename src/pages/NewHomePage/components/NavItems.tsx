import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import {forwardRef, useMemo} from 'react'
import {toast} from 'react-toastify'

import {CommonButton, LogoComponent} from '@/components'
import {Utility} from '@/helpers'
import {NavItemsProps} from '@/types/ComponentTypes'

const NavItems = forwardRef<HTMLDivElement, NavItemsProps>((props, ref) => {
  const {
    className = '',
    layoutClassName = '',
    showLogo = true,
    animationClass = '',
    onPressItem,
  } = props
  const NavData = useMemo(
    () => [
      {content: 'How it works', id: 'how_it_works'},
      {content: 'Trading Rules', id: 'trading_rules'},
      {content: 'Traders payout', id: 'testimonials'},
    ],
    []
  )

  useGSAP(() => {
    gsap.fromTo(
      '.nav__item',
      {
        opacity: 0,
        y: 10,
      },
      {
        opacity: 1,
        y: 0,
        stagger: {
          each: 0.2,
          grid: 'auto',
          ease: 'power2.inOut',
        },
        ease: 'power3.in',
      }
    )
  })

  return (
    <div
      ref={ref}
      className={`${className} hidden lg:container lg:mx-auto items-center justify-between gap-4 xl:gap-8 h-full w-full px-5 lg:flex`}
      id="nav__item__parent"
    >
      <div className="flex items-center gap-7 xl:gap-14">
        {NavData.map((nav) => {
          const {content, id} = nav
          return (
            <div
              key={content}
              className={`text-base/5 font-light! text-tertiary-color hover:text-primary-color nav__item  cursor-pointer ${animationClass}`}
              onClick={(e) => {
                e.stopPropagation()
                onPressItem?.('')
                Utility.ScrollToSectionUtility(id)
              }}
            >
              {content}
            </div>
          )
        })}
      </div>
      {showLogo && (
        <LogoComponent
          layoutClassName="flex-row-reverse"
          singleLineContent="Zeno Traders"
        />
      )}
      <div className={`flex items-center gap-5 ${layoutClassName}`}>
        {['Login', 'Start Your Challenge']?.map((item, index) => (
          <CommonButton
            key={item}
            isAnimatedType
            className={`w-fit! text-base/5! font-geist! font-semibold! tracing-[-0.14px]! py-0! h-[45px] px-5! ${index === 0 ? 'text-tertiary-color! hover:text-primary-color! transition-all duration-500 ease-in' : 'white__primary_btn'}`}
            singleLineContent={item}
            onClick={(e) => {
              e.stopPropagation()
              toast.error(
                'Zeno Traders is currently available for selected traders. Public access will open soon. Stay tuned.'
              )
            }}
          />
        ))}
      </div>
    </div>
  )
})

export default NavItems
