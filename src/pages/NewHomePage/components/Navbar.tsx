import {useEffect, useState} from 'react'

import {LogoComponent} from '@/components'

import NavItems from './NavItems'
import NavvButton from './NavvButton'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(window.scrollY > 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      className={`fixed inset-0 h-[96px] flex items-center bg-primary-black w-full border-b border-solid transition__utility ${isScrolled ? 'border-dark-color1' : 'border-transparent'}`}
    >
      <div className="flex lg:hidden w-full items-center justify-between h-full px-8">
        <LogoComponent
          layoutClassName="block lg:hidden"
          singleLineContent="Zeno Trader"
        />
        <NavvButton />
      </div>
      <NavItems />
    </div>
  )
}

export default Navbar
