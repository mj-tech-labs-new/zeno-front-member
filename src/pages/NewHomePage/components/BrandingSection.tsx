import Marquee from 'react-fast-marquee'

import {ImageComponent, WordSplit} from '@/components'
import {Constants} from '@/helpers'

const BrandingSection = () => (
  <div className="py-12 md:py-28 lg:pb-[152px] max-w-3xl mx-auto space-y-10">
    <WordSplit
      className="w-fit! font-geist! text-sm/[21px]! mx-auto text-primary-color! text-center"
      singleLineContent="Supported by Leading Industry Partners"
    />
    <Marquee
      gradient
      className="-z-10"
      gradientColor="rgba(0, 0, 0)"
      gradientWidth={110}
      loop={0}
    >
      <div className="flex gap-4">
        {Array.from({length: 2}).map(() =>
          Constants.brandImages.map((item) => (
            <ImageComponent
              key={item}
              className="w-[190px] h-[66px]"
              imageUrl={item}
            />
          ))
        )}
      </div>
    </Marquee>
  </div>
)

export default BrandingSection
