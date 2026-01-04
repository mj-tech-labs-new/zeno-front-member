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
      className={`fixed inset-0 h-[96px] z-99999 flex items-center justify-between bg-primary-black w-screen border-b border-solid ${isScrolled ? 'border-dark-color1' : 'border-transparent'}`}
    >
      <div className="flex lg:hidden items-center justify-between h-full w-[calc(100%-32px)] mx-auto">
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
