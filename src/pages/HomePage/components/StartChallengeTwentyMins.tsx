import {useEffect, useMemo, useRef, useState} from 'react'
import {SwiperRef, SwiperSlide} from 'swiper/react'

import {
  CommonButton,
  HeadingComponent,
  ImageComponent,
  ListingComponent,
  SwiperComponent,
} from '@/components'
import {Constants, English, Images} from '@/helpers'

const StartChallengeTwentyMins = () => {
  const swiperRef = useRef<SwiperRef>(null)
  const [slideActionOptions, setSlideActionOptions] = useState({
    isEnd: false,
    isStart: true,
  })
  const sliderActionButtons = useMemo(
    () => [
      {
        icon: Images.arrowLeft,
        type: 'previous',
      },
      {
        icon: Images.arrowLeft,
        type: 'next',
      },
    ],
    []
  )

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.on('slideChange', (e) => {
        setSlideActionOptions({
          isEnd: e.isEnd,
          isStart: e.isBeginning,
        })
      })
    }
  }, [])

  return (
    <div className="bg-primary-black text-primary-color font-[430] w-full lg:pt-[120px] lg:pb-[240px] lg:pl-[51px]">
      <div className="flex gap-5">
        <div className="hidden lg:flex lg:items-end lg:w-[275px] h-fit mt-[124px]">
          <div className="flex items-center gap-3">
            <ListingComponent type="normal_list_type" />
            <HeadingComponent
              className="!text-sm !tracking-[-0.14px]"
              singleLineContent={English.E210}
              type="h2"
            />
          </div>
        </div>
        <div className="w-full lg:w-[calc(100%-275px)] space-y-12 lg:space-y-[59px] px-4 lg:px-0">
          <div className="lg:pr-[53px] text-4xl leading-[38px] tracking-[-1px] flex justify-between">
            <div>
              <HeadingComponent
                className="!font-[430] !text-4xl !leading-[38px] !tracking-[-1.08px]"
                singleLineContent={English.E211}
                type="h2"
              />
              <HeadingComponent
                className="!font-[430] !text-4xl !text-landing-page-freedom-clarity-growth/40 !leading-[38px] !tracking-[-1.08px]"
                singleLineContent={English.E212}
                type="h2"
              />
            </div>

            <div className="hidden lg:flex lg:items-end lg:gap-2">
              {sliderActionButtons?.map((actionButtons) => {
                const {icon, type} = actionButtons
                return (
                  <CommonButton
                    key={type}
                    className={`!rounded-full bg-landing-page-features-arrows-bg flex justify-center items-center transition-all duration-300 ease-in-out !p-0 !h-10 !w-10 [&>div]:!h-auto [&>div]:!w-auto [&>div>img]:!size-4 ${type === 'next' && slideActionOptions.isEnd && 'opacity-40 pointer-events-none'} ${type === 'previous' && slideActionOptions.isStart && 'opacity-40 pointer-events-none'} ${type === 'next' ? 'rotate-180' : ''}`}
                    imageUrl={icon}
                    singleLineContent=""
                    onClick={() => {
                      if (type === 'next') {
                        swiperRef.current?.swiper.slideNext()
                        return
                      }
                      swiperRef.current?.swiper.slidePrev()
                    }}
                  />
                )
              })}
            </div>
          </div>

          <div className="flex gap-1 gradient_container">
            <SwiperComponent
ref={swiperRef} slidesPerView={3}
spaceBetween={4}>
              {Constants.zenoCards.map((card) => (
                <SwiperSlide key={card.id} className="!h-[635px] lg:!h-[360px]">
                  <div
                    key={card.id}
                    className="w-full h-[360px] bg-linear-gr-bg2-color space-y-20 p-4 flex flex-col justify-between"
                  >
                    <HeadingComponent
                      className="!font-[430] !text-landing-page-freedom-clarity-growth/50 !text-[12px] !leading-3 !tracking-[-0.12px]"
                      singleLineContent={card.heading}
                      type="h3"
                    />

                    <div className="h-full flex flex-col justify-between">
                      <ImageComponent
                        className="size-12 mx-auto"
                        imageUrl={card.logo}
                      />
                      <div className="flex flex-col gap-[13.7px]">
                        <HeadingComponent
                          className="!text-base !leading-[17px] !tracking-[-0.14px]"
                          singleLineContent={card.subHeading}
                          type="h4"
                        />
                        <ul className="flex flex-wrap gap-2">
                          {card.tags.map((tag) => (
                            <li
                              key={tag}
                              className="text-[13px] leading-3 tracking-[-0.1px] rounded-lg bg-landing-page-freedom-clarity-growth-bg py-[4px] px-[8px]"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </SwiperComponent>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StartChallengeTwentyMins
