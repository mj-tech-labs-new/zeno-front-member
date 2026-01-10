import { useEffect, useRef, useState } from 'react'

import {
  Accordian,
  ImageComponent,
  WordSplit,
} from '@/components'
import { Constants, English, Images } from '@/helpers'
import { useClickOutside } from '@/hooks'

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
      className=" min-h-[920px] flex items-center bg-linear-to-r from-light-gr1 via-light-gr2 to-light-gr3"
      id="how_it_works"
    >
      <div ref={sectionRef} className="flex items-center py-[120px] pl-5 xl:pl-52">
        <div className="flex flex-col lg:flex-row gap-2 h-full ">
          <div className="flex flex-col justify-between gap-5 w-full shrink-0 max-w-[590px] xl:pr-[110px]">
            <WordSplit
              className="text-primary-black!"
              singleLineContent={English.E400}
            />
            <div className="flex items-center">
              <div className="w-full mt-auto h-[500px] z-30 flex">
                <div className="h-fit mt-auto">
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
          </div>


          <ImageComponent
            className="flex items-center justify-center  custom_shadow overflow-hidden rounded-l-[24px] z-20"
            imageUrl={
              currentIndex === 0
                ? Images.fullDashboard
                : currentIndex === 1
                  ? Images.heroImage
                  : Images.price
            }
          />
        </div>
      </div>
    </div>
  )
}

export default WorkSection
