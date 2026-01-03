import {useEffect, useRef, useState} from 'react'

import {
  Accordian,
  ImageComponent,
  OpacityContainer,
  WordSplit,
} from '@/components'
import {Constants, English, Images} from '@/helpers'
import {useClickOutside} from '@/hooks'

const WorkSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const intervaId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Constants.QA.length)
    }, 5000)

    return () => clearInterval(intervaId)
  }, [currentIndex])

  const sectionRef = useRef<HTMLDivElement>(null)

  useClickOutside({
    refs: [sectionRef],
    onClickOutside() {
      setCurrentIndex(0)
    },
  })

  return (
    <div
      ref={sectionRef}
      className="py-[120px] xl:pl-[370px] px-5 lg:pr-0 h-full bg-linear-to-r from-light-gr1 via-light-gr2 to-light-gr3"
    >
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="flex flex-col justify-between">
          <WordSplit
            className="text-primary-black!"
            singleLineContent={English.E400}
          />
          <div>
            {Constants.QA.map((qa, index) => (
              <Accordian
                key={qa.que}
                isLineType
                className="!gap-0"
                isOpen={currentIndex === index}
                multilineContent={[qa.ans]}
                singleLineContent={qa.que}
                onPressItem={() => {
                  setCurrentIndex(index)
                }}
              />
            ))}
          </div>
        </div>

        <OpacityContainer
          key={currentIndex}
          isHorizontalPositionType
          isStaggerType={false}
          isVerticalPositionType={false}
        >
          <ImageComponent
            className="py-5 h-full w-full aspect-[1.45/1] shrink-0"
            imageUrl={currentIndex !== 2 ? Images.heroImage : Images.price}
          />
        </OpacityContainer>
      </div>
    </div>
  )
}

export default WorkSection
