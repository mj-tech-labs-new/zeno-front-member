import {useState} from 'react'

import {HeadingComponent, Loader, TabComponent} from '@/components'
import {Constants, English} from '@/helpers'

import CertificateTab from './components/CertificateTab'

const Certificate = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [showLoader, setShowLoader] = useState(false)

  return (
    <div className="flex flex-col gap-8 mt-8">
      <Loader
        ref={(ref) => {
          ref?.showLoader(showLoader)
        }}
      />
      <HeadingComponent singleLineContent={English.E22} variant="medium" />
      <TabComponent
        activeIndex={activeIndex}
        headingData={Constants.CertificateTabHeading}
        setActiveIndex={setActiveIndex}
      >
        <CertificateTab
          activeIndex={activeIndex}
          setLoader={(value) => {
            setShowLoader(value)
          }}
        />
      </TabComponent>
    </div>
  )
}

export default Certificate
