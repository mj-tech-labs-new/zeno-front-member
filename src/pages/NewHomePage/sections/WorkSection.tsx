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
    <div className="py-[120px] pl-5 xl:pl-52 pt-[118px] bg-linear-to-r from-light-gr1 via-light-gr2 to-light-gr3">
      <div ref={sectionRef} className="flex items-center ">
        <div className="flex flex-col lg:flex-row gap-2 h-full ">
          <div className="flex flex-col w-full shrink-0 max-w-[590px] xl:pr-[110px]">
            <WordSplit
              className="text-primary-black!"
              singleLineContent={English.E400}
            />
            <div className="h-full flex items-center">
              <div className="h-fit mt-auto w-full">
                {Constants.QA.map((qa, index) => (
                  <div key={qa.que} className="">
                    <Accordian
                      isLineType
                      className="!gap-0"
                      indexValue={index + 1}
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
              className="flex items-center justify-center w-[950px]h-[656px] custom_shadow overflow-hidden rounded-l-[24px]"
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
    </div>
  )
}

export default WorkSection
