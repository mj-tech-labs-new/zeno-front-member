import {useRef, useState} from 'react'

import {HeadingComponent, Loader, TabComponent} from '@/components'
import {Constants, English} from '@/helpers'
import {AppLoaderRef} from '@/types/ComponentTypes'

import CertificateTab from './components/CertificateTab'

const Certificate = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const loaderRef = useRef<AppLoaderRef>(null)

  return (
    <div className="flex flex-col gap-8 mt-8">
      <Loader ref={loaderRef} />
      <HeadingComponent singleLineContent={English.E22} variant="medium" />
      <TabComponent
        activeIndex={activeIndex}
        headingData={Constants.CertificateTabHeading}
        setActiveIndex={setActiveIndex}
      >
        <CertificateTab
          activeIndex={activeIndex}
          setLoader={(value) => {
            loaderRef.current?.showLoader(value)
          }}
        />
      </TabComponent>
    </div>
  )
}

export default Certificate
