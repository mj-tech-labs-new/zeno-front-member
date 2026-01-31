import {memo, useEffect, useState} from 'react'

import {Images} from '@/helpers'
import {LogoComponentProps} from '@/types/ComponentTypes'

import ImageComponent from '../ImageComponent/ImageComponent'

const LogoComponent = (props: LogoComponentProps) => {
  const {layoutClassName = '', className = '', isBlackLogo = false} = props

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 642)

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth < 642) {
        setIsSmallScreen(true)
      } else {
        setIsSmallScreen(false)
      }
    }
    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])
  return (
    <div className={`flex gap-4 items-center ${layoutClassName}`}>
      <ImageComponent
        className={`h-6 ${className}`}
        imageUrl={
          isSmallScreen
            ? Images.logoWithoutText
            : isBlackLogo
              ? Images.plaformLogoBlack
              : Images.platformLogo
        }
      />
    </div>
  )
}

export default memo(LogoComponent)
