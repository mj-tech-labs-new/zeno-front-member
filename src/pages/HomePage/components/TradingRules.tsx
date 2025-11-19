import {HeadingComponent, ListingComponent} from '@/components'
import {English} from '@/helpers'

import StepComponent from './StepComponent'

const TradingRules = () => (
  <div className="bg-marquee-gradient-bg lg:pt-[123px] lg:pb-[101px] pb-[50px] pt-16 space-y-[34px] px-4 lg:px-13 lg:space-y-[88px]">
    <div className="flex gap-5 font-[430] w-full">
      <div className="hidden lg:flex lg:w-[213px] max-h-fit items-center *:h-fit sticky top-[64px]  gap-3">
        <ListingComponent type="multi_list_type" />
        <HeadingComponent
          className="!text-sm !tracking-[-0.14px] !text-primary-black"
          singleLineContent={English.E213}
          type="h2"
        />
      </div>

      <div className="w-full lg:space-y-22 space-y-8.5 lg:w-[calc(100%-275px)] pt-16 lg:py-0">
        <div className="text-4xl leading-[38px] tracking-[-1px] flex  justify-between sm:w-[80%]">
          <div className="flex flex-col gap-4">
            <HeadingComponent
              className="!text-primary-black !font-[430] !text-4xl !leading-[38px] !tracking-[-1.08px]"
              singleLineContent={English.E214}
              type="h2"
            />
            <HeadingComponent
              className="!text-landing-page-trading-rules-para-text !text-xl !tracking-[-0.52px] !leading-7"
              singleLineContent={English.E215}
              type="h3"
            />
          </div>
        </div>
        <StepComponent />
      </div>
    </div>
  </div>
)

export default TradingRules
