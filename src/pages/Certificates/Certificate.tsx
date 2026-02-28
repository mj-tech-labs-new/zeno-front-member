import {useRef, useState} from 'react'

import {HeadingComponent, Loader, TabComponent} from '@/components'
import {Constants, English} from '@/helpers'
import {AppLoaderRef} from '@/types/ComponentTypes'

import CertificateTab from './components/CertificateTab'

const Certificate = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const loaderRef = useRef<AppLoaderRef>(null)
  const [isEmpty, setIsEmpty] = useState(false)

  return (
    <div className="flex flex-col h-full gap-8 pt-8">
      <Loader ref={loaderRef} />
      <HeadingComponent singleLineContent={English.E22} variant="medium" />

      <TabComponent
        activeIndex={activeIndex}
        className={`h-full! ${isEmpty ? 'gap-0!' : ''}`}
        headingData={Constants.CertificateTabHeading}
        isDividerType={!isEmpty}
        setActiveIndex={setActiveIndex}
      >
        <CertificateTab
          activeIndex={activeIndex}
          setIsEmpty={setIsEmpty}
          setLoader={(value) => {
            loaderRef.current?.showLoader(value)
          }}
        />
      </TabComponent>
    </div>
  )
}

export default Certificate
