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
      className=" h-[940px] py-5 lg:py-[54px] xl:py-[118px] flex items-center  xl:pl-[370px] px-5 lg:pr-0  bg-linear-to-r from-light-gr1 via-light-gr2 to-light-gr3"
    >
      <div className="flex flex-col lg:flex-row gap-2 h-full min-h-[654px]">
        <div className="flex flex-col">
          <WordSplit
            className="text-primary-black!"
            singleLineContent={English.E400}
          />
          <div className="h-full flex items-center">
            <div className="h-fit my-auto w-full">
              {Constants.QA.map((qa, index) => (
                <div key={qa.que} className="">
                  <Accordian
                    isLineType
                    className="!gap-0"
                    isOpen={currentIndex === index}
                    multilineContent={[qa.ans]}
                    singleLineContent={qa.que}
                    onPressItem={() => {
                      setCurrentIndex(index)
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <OpacityContainer
          key={currentIndex}
          isHorizontalPositionType
          isStaggerType={false}
          isVerticalPositionType={false}
        >
          <ImageComponent
            className="h-full flex items-center justify-center [&>img]:object-contain"
            imageUrl={
              currentIndex === 0
                ? Images.fullDashboard
                : currentIndex === 1
                  ? Images.heroImage
                  : Images.price
            }
          />
        </OpacityContainer>
      </div>
    </div>
  )
}

export default WorkSection
