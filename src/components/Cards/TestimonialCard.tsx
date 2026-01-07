import {Images} from '@/helpers'
import {TestimonialCardProps} from '@/types/ComponentTypes'

import HeadingComponent from '../HeadingComponent/HeadingComponent'
import ImageComponent from '../ImageComponent/ImageComponent'
import LogoComponent from '../LogoComponent/LogoComponent'

const TestimonialCard = (props: TestimonialCardProps) => {
  const {details, headingContent, initialContent, secondaryContent, flag} =
    props

  return (
    <div className="space-y-0.5 w-[250px] lg:w-[320px] *:font-geist!">
      <div className="bg-dark-black-color rounded-tr-[33px] rounded-tl-[33px] ">
        <div className="p-3.5 lg:p-7 space-y-4 lg:space-y-[22px] h-[120px]  lg:h-[146px]">
          <div className="flex flex-row gap-3  justify-between">
            <HeadingComponent
              className="text-3xl! font-light!"
              singleLineContent={initialContent}
              type="h4"
            />
            <LogoComponent />
          </div>
          <div className="flex gap-2.5 items-center">
            <ImageComponent className="[&>img]:size-6!" imageUrl={flag} />
            <span className="text-primary-color text-sm lg:text-lg/6 font-geist font-light!">
              {secondaryContent}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4 lg:space-y-8 relative rounded-b-[33px]! overflow-hidden p-7">
        <ImageComponent
          className="absolute right-0 top-0 h-full w-full -z-20"
          imageUrl={Images.flame}
        />
        <div className="absolute top-0 left-0 h-full w-full bg-linear-to-l from-primary-black/50 via-0% to-dark-black-color -z-10" />
        <HeadingComponent
          className="text-lg xl:text-2xl! font-light!"
          singleLineContent={headingContent}
          type="h4"
        />
        <div className="space-y-6">
          {details?.map((items) => {
            const {key, value} = items
            return (
              <div key={key} className="font-geist flex flex-col *:font-light!">
                <span className="text-sm  lg:text-lg/8 font-geist text-primary-color">
                  {value}
                </span>
                <span className=" text-sm lg:text-lg/[22px] font-geist text-secondary-light-color">
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
