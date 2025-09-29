import {GoBackButton, LogoComponent} from '@/components'
import {English} from '@/helpers'
import {GeneralProps} from '@/types/CommonTypes'

const Layout2 = (props: Required<Pick<GeneralProps, 'children'>>) => {
  const {children} = props
  return (
    <div className="h-screen w-screen p-2 md:p-4 lg:p-8 xl:p-12">
      <div className="w-full relative">
        <GoBackButton />
        <LogoComponent
          singleLineContent={English.E20}
          layoutClassName="absolute top-0 left-1/2 -translate-x-1/2 flex-row-reverse"
        />
      </div>
      <div className="mt-10 h-[calc(100%-64px)] overflow-y-auto w-full md:w-[calc(100%-38px)] lg:w-[calc(100%-54px)] xl:w-[calc(100%-86px)] mx-auto no-scrollbar relative">
        {children}
      </div>
    </div>
  )
}

export default Layout2
