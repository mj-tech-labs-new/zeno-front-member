import {memo} from 'react'

import {ImageComponent, OpacityContainer, WordSplit} from '@/components'
import {Constants, English} from '@/helpers'

interface WhyUsCardProps {
  img: string
  title: string
  content: string
}

const WhyUsCard = memo((props: WhyUsCardProps) => {
  const {content, img, title} = props

  return (
    <OpacityContainer>
      <div className="space-y-5">
        <ImageComponent className="size-7" imageUrl={img} />
        <p className="text-primary-color text-xl/7 font-geist" id="words">
          {title}
        </p>
        <p className="text-primary-color/50 text-base/6 font-geist font-normal ">
          {content}
        </p>
      </div>
    </OpacityContainer>
  )
})

const WhyUs = () => (
  <div className="pt-[120px] pb-[152px] ">
    <div className=" px-5 xl:px-0 max-w-6xl mx-auto space-y-20">
      <WordSplit singleLineContent={English.E390} />

      <div className="grid grid-cols-1 gap-x-2.5 md:grid-cols-2 md:gap-x-5 lg:grid-cols-3 lg:gap-x-[60px] gap-y-10 lg:gap-y-[60px]">
        {Constants.WhyContactUs.map((item) => {
          const {content, img, title} = item
          return (
            <WhyUsCard key={title} content={content} img={img} title={title} />
          )
        })}
      </div>
    </div>
  </div>
)

export default WhyUs
