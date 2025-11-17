import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {CommonButton, LogoComponent} from '@/components'
import {useModalContext} from '@/components/Modal/context/ModalContextProvider'
import {English, Images} from '@/helpers'

import NavList from './NavList'

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const [windowSize, setWindowSize] = useState(window.innerWidth)
  const {setChildContent, setModalProps} = useModalContext()

  useEffect(() => {
    const calculateWindowWidth = () => {
      setWindowSize(window.innerWidth)
      if (window.innerWidth > 1024) {
        setShowMenu(false)
      }
    }
    window.addEventListener('resize', calculateWindowWidth)
    return () => {
      window.removeEventListener('resize', calculateWindowWidth)
    }
  }, [])

  useEffect(() => {
    if (showMenu && windowSize < 1024) {
      setModalProps({
        className:
          '!top-0 !translate-y-0 !left-full !-translate-x-full !h-screen !w-[80%] sm:!w-[40%] !rounded-none !flex !flex-col',
        onPressButton(state) {
          setShowMenu(state)
          setChildContent(null)
          setModalProps(null)
        },
      })
      setChildContent(<NavList />)
      return
    }

    setModalProps(null)
    setChildContent(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showMenu, windowSize])

  return (
    <div className="flex items-center justify-between p-4 lg:px-[52px] lg:py-3 fixed top-0 w-full bg-white z-20 lg:gap-[85px]">
      <LogoComponent
        className="!w-5"
        layoutClassName="[&>h1]:!text-base/5 [&>h1]:!tracking-[-0.14px] [&>h1]:!font-switzer [&>h1]:!font-medium !flex-row-reverse !gap-2 !shrink-0 [&>h1]:!text-base [&>h1]:!text-extra-dark-danger-color"
        singleLineContent={English.E20}
      />

      {windowSize >= 1024 && <NavList />}

      <CommonButton
        className={`bg-extra-dark-danger-color text-white !px-3 !py-2 !rounded-full !text-sm !leading-5 !w-fit !ml-auto ${!showMenu && windowSize < 1024 ? 'block' : 'hidden'}`}
        singleLineContent={English.E138}
        onClick={() => {
          navigate('/dashboard')
        }}
      />

      <CommonButton
        className="lg:hidden block cursor-pointer !w-fit !p-0 ml-4"
        imageUrl={Images.navbarIcon}
        singleLineContent=""
        onClick={() => {
          setShowMenu((data) => !data)
        }}
      />
    </div>
  )
}

export default Navbar
