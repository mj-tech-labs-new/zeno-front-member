import {useRef, useState} from 'react'
import {SwiperRef, SwiperSlide} from 'swiper/react'

import {
  CommonButton,
  HeadingComponent,
  ListingComponent,
  SwiperComponent,
} from '@/components'
import CarouselCard from '@/components/Cards/CarouselCard'
import {Constants, English, Images} from '@/helpers'

const BrandingCarousel = () => {
  const [sliderId, setSliderId] = useState(1)
  const swiperRef = useRef<SwiperRef>(null)

  return (
    <div className="flex flex-col gap-8 lg:gap-[60px] bg-primary-color px-4 lg:px-[52px] pt-[34px] pb-4 lg:py-[120px] ">
      <div className="flex flex-row flex-wrap gap-5 justify-between items-end w-full lg:w-[calc(100%-217px)] ml-0 lg:ml-auto">
        <p className="text-landing-page-features-lg-less-opacity-gray/70 text-[36px] !leading-[38px] font-bureau max-w-[517px]">
          <span className="!text-linear-gr-bg1-color">{English.E185} </span>
          {English.E187}
        </p>
        <CommonButton
          className="black-secondary-btn-type !w-fit !rounded-full !px-9 !py-3 hidden lg:block"
          singleLineContent={English.E186}
        />
      </div>

      <div className="flex gap-2 w-full">
        <div className="w-[213px] shrink-0 hidden lg:flex lg:flex-col lg:gap-1 sticky top-16 h-fit">
          {Constants.carouselOptions.map((item, _) => (
            <div
              key={item.sliderId}
              className="flex items-center gap-3 py-1 cursor-pointer"
              onClick={() => {
                setSliderId(item.sliderId)
                swiperRef.current?.swiper.slideTo(item.sliderId - 1)
              }}
            >
              <ListingComponent
                className={`hidden lg:block !border ${item.sliderId !== sliderId ? ' !border-inactive-bullets-color !rounded-full [&>div]:!bg-transparent [&>div]:size-[6px]' : 'border-none [&>div]:!bg-primary-black'}`}
                type="normal_list_type"
              />
              <HeadingComponent
                className={`!text-xl lg:!text-sm/5 !tracking-[-0.14px] ${item.sliderId !== sliderId ? '!text-landing-page-features-lg-less-opacity-gray/41 !pb-1 lg:!pb-0' : '!text-linear-gr-bg2-color !border-b-2 !pb-1 lg:!border-b-0 lg:!pb-0'}`}
                singleLineContent={item.content}
                type="h2"
              />
            </div>
          ))}
        </div>

        <div className="flex-1 space-y-[61px] w-[calc(100%-213px)]">
          <SwiperComponent
            ref={swiperRef}
            isAutoPlayType
            isMouseWheelType
            slidesPerView={1}
            spaceBetween={4}
            onSlideChange={(element) => {
              setSliderId(element.activeIndex + 1)
            }}
          >
            {Array.from({length: 3}).map((_, key) => (
              <SwiperSlide key={`slide_${key.toString()}`}>
                <CarouselCard
                  className="bg-landing-page-landing-page-carousel-divider-bg p-6"
                  layoutClassName="hidden sm:block"
                  type="contentType"
                  data={{
                    userName: 'Aveni Deno',
                    userInfo: 'Full-time Trader',
                    singleLineContent:
                      key === 0
                        ? 'Professional Trader'
                        : key === 1
                          ? 'Part-time Trader'
                          : ' Beginner Trader ',
                    multilineContent: [
                      'I dreamed of trading big without risking savings. With Zeno, I passed the $25,000 Strategist challenge, now trade a $50,000 funded account, and withdrew $3,200 risk-free',
                    ],
                    items: [
                      {
                        title: 'Profit withdrawn',
                        content: '$3,200',
                      },
                      {
                        title: 'Funded account unlocked',
                        content: '$50,000',
                      },
                    ],
                    userImg: Images.placeholderImg,
                    imageUrl: Images.carouselImg,
                  }}
                />
              </SwiperSlide>
            ))}
          </SwiperComponent>
        </div>
      </div>
    </div>
  )
}

export default BrandingCarousel
