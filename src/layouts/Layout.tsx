import {useCallback, useEffect, useRef, useState} from 'react'
import {CiMenuBurger} from 'react-icons/ci'
import {Outlet} from 'react-router-dom'

import {Sidebar} from '@/components'
import Loader from '@/components/Loader/Loader'
import {useClickOutside} from '@/hooks'

const Layout = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen((data) => !data)
  }, [])

  useClickOutside({
    refs: [menuRef],
    onClickOutside: handleCloseMenu,
  })

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth < 1024) {
        setIsSmallScreen(true)
      } else {
        setIsMenuOpen(false)
        setIsSmallScreen(false)
      }
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  return (
    <div className="h-screen w-screen">
      <Loader ref={(ref) => ref?.showLoader(true)} />
      <div className="h-full w-full flex">
        <div className="w-12 transition-all duration-300 ease-in lg:w-[250px] shrink-0 bg-secondary-bg-color h-full">
          {isSmallScreen && (
            <CiMenuBurger
              className="block lg:hidden text-2xl text-primary-color ml-3.5 mt-8 cursor-pointer"
              onClick={handleCloseMenu}
            />
          )}
          {(isMenuOpen || !isSmallScreen) && (
            <div
              className={
                isSmallScreen && isMenuOpen
                  ? 'fixed h-full w-[250px] top-0 left-0 z-10 bg-secondary-bg-color'
                  : ''
              }
              ref={menuRef}
            >
              <Sidebar onPressItem={handleCloseMenu} />
            </div>
          )}
        </div>
        <div className="flex-1 w-full px-4  md:px-8 pt-11 max-h-screen overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
