import {useRef} from 'react'

import {CommonButton, DescriptionComponent, ImageComponent} from '@/components'
import {Images} from '@/helpers'

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  return (
    <div className="h-screen pt-[96px] w-full flex items-center justify-center relative">
      <div className="h-screen w-full absolute -z-10 inset-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          aria-label="video"
          className=""
          controls={false}
        >
          <source src="src\assets\static_assets\video_2.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="space-y-8">
        <div className="max-w-full px-5 md:max-w-3xl lg:px-0 w-full mx-auto space-y-5">
          <div
            className="p-1.5 mx-auto  rounded-full border border-solid border-primary-color/20 group  flex gap-2 w-fit opacity-0"
            id="description_content"
          >
            <span className="py-[2.5px] px-1.5 uppercase bg-medium-success-color text-[10px]/4 font-bold rounded-full">
              new
            </span>
            <p className="text-dark-red-color font-medium text-sm/5 ml-2">
              Zeno is live for trading
            </p>
            <ImageComponent
              className="w-6! flex justify-center items-center [&>img]:w-[6px]!"
              imageUrl={Images.smallArrow}
            />
          </div>
          <DescriptionComponent
            isAnimationType
            className="text-4xl! leading-10! lg:text-[56px]! lg:leading-[67px]! text-primary-color! text-center"
            multilineContent={[
              'A Crypto Prop Firm Built for',
              'Disciplined Traders',
            ]}
          />
          <DescriptionComponent
            isAnimationType
            className="max-w-[400px]! mx-auto text-center text-[20px]!"
            multilineContent={[
              'Trade with clear risk rules, no time pressure,',
              'and transparent payouts. Scale your funded',
              'account up to $200,000',
            ]}
          />
        </div>
        <div className="flex items-center gap-2 justify-center z-10">
          <CommonButton
            isAnimatedType
            className="white__primary_btn"
            singleLineContent="Get Funded"
          />
          <CommonButton
            isAnimatedType
            className="gray__outlined_btn"
            singleLineContent="Get Funded"
          />
        </div>
      </div>
    </div>
  )
}

export default HeroSection
