import {useCallback, useEffect, useRef, useState} from 'react'
import {Outlet, useLocation} from 'react-router-dom'

import {ImageComponent, LogoComponent, Sidebar} from '@/components'
// import Loader from '@/components/Loader/Loader'
import {Images} from '@/helpers'
import {useClickOutside} from '@/hooks'
import {AppLoaderRef} from '@/types/ComponentTypes'

const Layout = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const loaderRef = useRef<AppLoaderRef>(null)
  const location = useLocation()

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

  useEffect(() => {
    loaderRef.current?.showLoader(true)
    setTimeout(() => {
      loaderRef.current?.showLoader(false)
    }, 2000)
  }, [location.pathname])

  return (
    <div className="h-screen w-screen overflow-y-hidden">
      {/* <Loader ref={loaderRef} /> */}
      <div className="h-full w-full flex flex-col lg:flex-row">
        <div className="w-full transition-all duration-300 ease-in lg:w-[250px] shrink-0 bg-secondary-bg-color lg:h-full">
          {isSmallScreen ? (
            <div className="flex items-center justify-start w-full h-full p-4 relative">
              <div
                className="block lg:hidden h-5 w-5 text-2xl text-primary-color cursor-pointer"
                onClick={handleCloseMenu}
              >
                <ImageComponent
                  className="h-full w-full"
                  imageUrl={Images.menu}
                />
              </div>
              <LogoComponent layoutClassName="!absolute left-1/2 -translatex-x-1/2 top-1/2 -translate-y-1/2" />
            </div>
          ) : null}
          {isMenuOpen || !isSmallScreen ? (
            <div
              ref={menuRef}
              className={
                isSmallScreen && isMenuOpen
                  ? 'fixed h-full w-[250px] top-0 left-0 z-50 bg-secondary-bg-color'
                  : ''
              }
            >
              <Sidebar onPressItem={handleCloseMenu} />
            </div>
          ) : null}
        </div>
        <div className="flex-1 w-full px-2 md:px-8 overflow-y-auto h-screen bg-primary-bg-color">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
