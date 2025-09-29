import {useState} from 'react'

import {HeadingComponent, TabComponent} from '@/components'
import {Constants, English} from '@/helpers'

import CertificateTab from './components/CertificateTab'

const Certificate = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <div className="flex flex-col gap-8">
      <HeadingComponent singleLineContent={English.E90} variant="medium" />
      <TabComponent
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        headingData={Constants.CertificateTabHeading}
      >
        <CertificateTab
          type={
            activeIndex === 0 ? 'all' : activeIndex === 1 ? 'profit' : 'passed'
          }
        />
      </TabComponent>
    </div>
  )
}

export default Certificate
