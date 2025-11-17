import {Images} from '@/helpers'
import {CardCarouselType} from '@/types/ComponentTypes'

import DescriptionComponent from '../DescriptionComponent/DescriptionComponent'
import Divider from '../Divider/Divider'
import HeadingComponent from '../HeadingComponent/HeadingComponent'
import ImageComponent from '../ImageComponent/ImageComponent'

const CarouselCard = (props: CardCarouselType) => {
  const {data, type, className = '', layoutClassName = ''} = props
  if (type === 'imageType') {
    return (
      <ImageComponent className={layoutClassName} imageUrl={data?.imageUrl} />
    )
  }
  if (type === 'contentType') {
    const {singleLineContent, multilineContent, items} = data
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 w-full">
        <div
          className={`h-full flex flex-col gap-[125px] lg:gap-[237px] justify-between  ${className}`}
        >
          <HeadingComponent
            className="!text-primary-black !tracking-[-0.14px] font-switzer"
            singleLineContent={singleLineContent}
            type="h2"
          />

          <div className="flex flex-col gap-12">
            <DescriptionComponent
              className="!text-[22px] !leading-8 !text-linear-gr-bg2-color font-switzer "
              multilineContent={multilineContent}
            />
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-3">
                {items?.map((totalContent, index) => {
                  const {title, content} = totalContent
                  return (
                    <div
                      key={title}
                      className={`flex flex-col gap-3 ${index === 0 && 'border-r border-landing-page-landing-page-carousel-border/20'}`}
                    >
                      <HeadingComponent
                        className="!text-landing-page-trading-rules-para-text !text-sm !leading-[14px] !tracking-[-0.12px]"
                        singleLineContent={title}
                        type="h3"
                      />
                      <span className="text-linear-gr-bg2-color text-[28px] !leading-8 font-bureau">
                        {content}
                      </span>
                    </div>
                  )
                })}
              </div>
              <Divider className="!bg-landing-page-landing-page-carousel-border/20" />
              <div className="flex gap-4 justify-between items-center">
                <div className="flex gap-3">
                  <ImageComponent
                    className="w-10 h-10 !rounded-full overflow-hidden"
                    imageUrl={data?.userImg}
                  />
                  <div className="flex flex-col">
                    <DescriptionComponent
                      className="!pb-0 !text-linear-gr-bg2-color !text-sm !leading-6 !font-bureau"
                      multilineContent={[data?.userName]}
                    />
                    <span className="font-bureau text-landing-page-features-lg-less-opacity-gray/70 text-sm !leading-5">
                      {data?.userInfo}
                    </span>
                  </div>
                </div>

                <div className="size-9 rounded-full flex justify-center items-center bg-primary-color">
                  <ImageComponent
                    className="size-4 !rounded-full overflow-hidden"
                    imageUrl={Images.navigationArrow}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ImageComponent className={layoutClassName} imageUrl={data?.imageUrl} />
      </div>
    )
  }
  return null
}

export default CarouselCard
