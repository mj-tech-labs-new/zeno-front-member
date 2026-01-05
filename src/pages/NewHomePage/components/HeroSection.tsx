import { useRef } from 'react'

import { CommonButton, DescriptionComponent, ImageComponent } from '@/components'
import { English, Images } from '@/helpers'

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  return (
    <div className="h-[calc(100vh-95.2px)]  w-full flex items-center justify-center relative">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        aria-label="video"
        className="w-screen left-1/2 -translate-x-1/2 object-cover top-[94px] h-full absolute -z-10"
        controls={false}
      >
        <source src={Images.mainVideo} type="video/mp4" />
      </video>
      <div className="space-y-8">
        <div className="max-w-full px-5 md:max-w-3xl lg:px-0 w-full mx-auto space-y-5">
          <div
            id="description_content"
            className="p-1.5 font-geist!
             mx-auto  rounded-full border border-solid border-primary-color/20 group  flex  w-fit"
          >
            <span className="py-[2.5px] px-1.5 uppercase bg-medium-success-color text-[10px]/[15px] font-bold rounded-full">
              {English.E419}
            </span>
            <p className="text-dark-red-color font-medium text-sm/5 ml-2">
              {English.E420}
            </p>
            <ImageComponent
              className="w-6! ml-1 flex justify-center items-center [&>img]:w-[6px]!"
              imageUrl={Images.smallArrow}
            />
          </div>
          <DescriptionComponent
            isAnimationType
            className="text-2xl! sm:text-4xl! leading-10! lg:text-[56px]! lg:leading-[67px]! text-primary-color! text-center font-geist!"
            multilineContent={[
              'A Crypto Prop Firm Built for',
              'Disciplined Traders',
            ]}
          />
          <DescriptionComponent
            isAnimationType
            className="w-fit mx-auto text-center font-geist text-base  md:text-[20px]/[30px]!"
            multilineContent={[
              'Trade with clear risk rules, no time pressure,',
              'and transparent payouts. Scale your funded',
              'account up to $200,000',
            ]}
          />
        </div>
        <div className="flex flex-row flex-wrap items-center gap-2 justify-center z-10 *:font-geist!">
          <CommonButton
            isAnimatedType
            className="white__primary_btn py-3! px-6!"
            singleLineContent="Get Funded"
          />
          <CommonButton
            isAnimatedType
            className="gray__outlined_btn py-3! px-6!"
            singleLineContent="View Rules"
          />
        </div>
      </div>
    </div>
  )
}

export default HeroSection
