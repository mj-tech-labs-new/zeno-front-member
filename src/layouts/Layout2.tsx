import {useLocation} from 'react-router-dom'

import {GoBackButton, LogoComponent} from '@/components'
import {English} from '@/helpers'
import {GeneralProps} from '@/types/CommonTypes'

const Layout2 = (props: Required<Pick<GeneralProps, 'children'>>) => {
  const location = useLocation()
  const {children} = props
  return (
    <div
      className={
        location.pathname === '/'
          ? ''
          : 'h-screen w-screen p-2 md:p-4 lg:p-8 xl:p-12 bg-primary-bg-color'
      }
    >
      {!(location.pathname === '/') && (
        <div className="w-full relative">
          <GoBackButton />

          <LogoComponent
            layoutClassName="absolute top-0 left-1/2 -translate-x-1/2 flex-row-reverse"
            singleLineContent={English.E20}
          />
        </div>
      )}
      <div
        className={
          location.pathname === '/'
            ? ''
            : 'h-[calc(100%-64px)] mt-10 overflow-y-auto w-full md:w-[calc(100%-38px)] lg:w-[calc(100%-54px)] xl:w-[calc(100%-86px)] mx-auto no-scrollbar relative'
        }
      >
        {children}
      </div>
    </div>
  )
}

export default Layout2
