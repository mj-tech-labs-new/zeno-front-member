import {Images} from '@/helpers'
import {TestimonialCardProps} from '@/types/ComponentTypes'

import HeadingComponent from '../HeadingComponent/HeadingComponent'
import ImageComponent from '../ImageComponent/ImageComponent'
import LogoComponent from '../LogoComponent/LogoComponent'

const TestimonialCard = (props: TestimonialCardProps) => {
  const {details, headingContent, initialContent, secondaryContent, flag} =
    props

  return (
    <div className="space-y-0.5 w-[386px] *:font-geist!">
      <div className="bg-dark-black-color rounded-tr-[33px] rounded-tl-[33px]">
        <div className="p-7 space-y-[22px]">
          <div className="flex flex-col sm:flex-row  sm:justify-between">
            <HeadingComponent
              className="text-[40px]/[44px]!"
              singleLineContent={initialContent}
              type="h4"
            />
            <LogoComponent />
          </div>
          <div className="flex  items-center gap-3">
            <ImageComponent className="size-[22px]" imageUrl={flag} />
            <span className="text-primary-color text-lg/6 font-normal font-geist">
              {secondaryContent}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-8 relative rounded-br-[33px] p-7">
        <ImageComponent
          className="absolute right-0 top-0 h-full w-full -z-20"
          imageUrl={Images.flame}
        />
        <div className="absolute top-0 left-0 h-full w-full bg-linear-to-l from-primary-black/50 via-0% to-dark-black-color -z-10" />
        <HeadingComponent
          className="text-[28px]/[40px]!"
          singleLineContent={headingContent}
          type="h4"
        />
        <div className="space-y-6">
          {details?.map((items) => {
            const {key, value} = items
            return (
              <div key={key} className="font-geist flex flex-col">
                <span className="text-lg/8 font-normal font-geist text-primary-color">
                  {value}
                </span>
                <span className="text-lg/[22px] font-normal font-geist text-secondary-light-color">
                  {key}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard
