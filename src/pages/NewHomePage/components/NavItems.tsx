import {forwardRef, useMemo} from 'react'

import {CommonButton, LogoComponent} from '@/components'
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
      {content: 'How it works'},
      {content: 'Trading Rules'},
      {content: 'Traders payout'},
    ],
    []
  )
  return (
    <div
      ref={ref}
      className={` ${className} hidden items-center justify-between gap-4 xl:gap-8 h-full w-full px-8 lg:flex`}
      id="nav__item__parent"
    >
      <div className="flex items-center gap-7 xl:gap-14">
        {NavData.map((nav) => {
          const {content} = nav
          return (
            <div
              key={content}
              className={`text-lg/5 font-normal text-tertiary-color hover:text-primary-color transition__utility opacity-0 stagger_item  cursor-pointer ${animationClass}`}
              onClick={(e) => {
                e.stopPropagation()
                onPressItem?.(content)
              }}
            >
              {content}
            </div>
          )
        })}
      </div>
      {showLogo && <LogoComponent singleLineContent="Zeno Trader" />}
      <div className={`flex items-center gap-5 ${layoutClassName}`}>
        {['Login', 'Start Your Challenge']?.map((item, index) => (
          <CommonButton
            key={item}
            className={`w-fit! text-base/5! font-medium! stagger_item opacity-0 ${index === 0 ? 'text-tertiary-color! hover:text-primary-color! transition-all duration-500 ease-in' : 'white__primary_btn'}`}
            singleLineContent={item}
          />
        ))}
      </div>
    </div>
  )
})

export default NavItems
