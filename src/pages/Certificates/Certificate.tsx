// import { useRef } from 'react'

import {DescriptionComponent, HeadingComponent} from '@/components'
import {English} from '@/helpers'
// import { AppLoaderRef } from '@/types/ComponentTypes'

// import CertificateTab from './components/CertificateTab'

const Certificate = () => (
  // const [activeIndex, setActiveIndex] = useState(0)
  // const loaderRef = useRef<AppLoaderRef>(null)

  <div className="flex flex-col h-full gap-8 pt-8">
    {/* <Loader ref={loaderRef} /> */}
    <HeadingComponent singleLineContent={English.E22} variant="medium" />
    <div className="flex flex-col gap-5 justify-center items-center h-full">
      <DescriptionComponent
        className="font-bold! text-3xl text-primary-color!"
        singleLineContent={English.E55}
      />
      <DescriptionComponent
        className="text-base!"
        singleLineContent={English.E273}
      />
    </div>
    {/* <TabComponent
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
      </TabComponent> */}
  </div>
)

export default Certificate
