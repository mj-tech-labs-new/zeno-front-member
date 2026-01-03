import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import {memo} from 'react'

import {WordSplit} from '@/components'
import {Constants, English} from '@/helpers'

interface ChooseUsCardProps {
  video: string
  title: string
  content: string
}

const ChooseUsCard = memo((props: ChooseUsCardProps) => {
  const {content, video, title} = props
  return (
    <div className="h-full w-full space-y-5 choose_box">
      <video
        autoPlay
        loop
        muted
        aria-label="video"
        className="rounded-[10px]"
        controls={false}
      >
        <source src={video} type="video/mp4" />
      </video>
      <div className="space-y-3">
        <p className="text-primary-color font-semibold font-geist! text-xl/7">
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
      {opacity: 0, y: 30},
      {
        opacity: 1,
        y: 0,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: boxes[0] as Element,
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: 1,
        },
      }
    )
  }, [])

  return (
    <div className="pb-[120px] pt-[144px] px-5  xl:px-0 xl:max-w-6xl mx-auto space-y-10">
      <WordSplit singleLineContent={English.E407} />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Constants.WhyChoose.map((item, index) => {
          const {title} = item
          return (
            <ChooseUsCard
              key={title}
              {...item}
              video={
                index === 0
                  ? 'src\\assets\\static_assets\\c_video_1.mp4'
                  : index === 1
                    ? 'src\\assets\\static_assets\\c_video_2.mp4'
                    : 'src\\assets\\static_assets\\c_video_3.mp4'
              }
            />
          )
        })}
      </div>
    </div>
  )
}

export default ChooseUs
