import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import {memo} from 'react'

import {ImageComponent, WordSplit} from '@/components'
import {Constants, English, Images} from '@/helpers'

interface ChooseUsCardProps {
  images: string
  title: string
  content: string
}

const ChooseUsCard = memo((props: ChooseUsCardProps) => {
  const {content, images, title} = props
  return (
    <div className="h-full w-full space-y-5 choose_box">
      <ImageComponent
        className="h-[300px]! w-auto! [&>img]:object-cover!"
        imageUrl={images}
      />
      <div className="space-y-3">
        <p className="text-primary-color font-normal font-geist! text-xl/7">
          {title}
        </p>
        <p className="text-primary-color/50 font-normal font-geist! text-base/6">
          {content}
        </p>
      </div>
    </div>
  )
})

const ChooseUs = () => {
  useGSAP(() => {
    const boxes = gsap.utils.toArray('.choose_box')

    gsap.fromTo(
      boxes,
      {opacity: 0},
      {
        opacity: 1,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: boxes[0] as Element,
          start: 'top 80%',
          end: '+=30%',
          scrub: 1,
        },
      }
    )
  }, [])

  return (
    <div className="py-12 md:py-28 lg:pb-[120px] lg:pt-[144px] px-5  xl:px-0 xl:max-w-[1180px] mx-auto space-y-10">
      <WordSplit singleLineContent={English.E407} />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Constants.WhyChoose.map((item, index) => {
          const {title} = item
          return (
            <ChooseUsCard
              key={title}
              {...item}
              images={
                index === 0
                  ? Images.videoImg3
                  : index === 1
                    ? Images.videoImg2
                    : Images.videoImg1
              }
            />
          )
        })}
      </div>
    </div>
  )
}

export default ChooseUs
