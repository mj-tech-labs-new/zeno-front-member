import {memo} from 'react'

import {ImageComponent, OpacityContainer, WordSplit} from '@/components'
import {Constants, English} from '@/helpers'

interface ChooseUsCardProps {
  img: string
  title: string
  content: string
}

const ChooseUsCard = memo((props: ChooseUsCardProps) => {
  const {content, img, title} = props
  return (
    <div className="h-full w-full space-y-5">
      <ImageComponent imageUrl={img} />
      <div className="space-y-3">
        <OpacityContainer>
          <p className="text-primary-color font-semibold font-geist! text-xl/7">
            {title}
          </p>
        </OpacityContainer>
        <OpacityContainer isHorizontalPositionType>
          <p className="text-primary-color/50 font-normal font-geist! text-base/6">
            {content}
          </p>
        </OpacityContainer>
      </div>
    </div>
  )
})

const ChooseUs = () => (
  <div className="pb-[120px] pt-[144px] px-5  xl:px-0 xl:max-w-6xl mx-auto space-y-10">
    <WordSplit singleLineContent={English.E407} />
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Constants.WhyChoose.map((item) => {
        const {title} = item
        return <ChooseUsCard key={title} {...item} />
      })}
    </div>
  </div>
)

export default ChooseUs
