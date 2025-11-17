import {useCallback, useEffect, useRef, useState} from 'react'

import {ListingComponent} from '@/components'
import {FeatureComponentProps} from '@/types/ComponentTypes'

import FeatureCard from '../../../components/Cards/FeatureCard'
import DescriptionComponent from '../../../components/DescriptionComponent/DescriptionComponent'
import HeadingComponent from '../../../components/HeadingComponent/HeadingComponent'
import ImageComponent from '../../../components/ImageComponent/ImageComponent'

const Feature = (props: FeatureComponentProps) => {
  const headingElement = useRef<HTMLDivElement | null>(null)
  const {item, setCalculatedHeight, parentId} = props
  const {heading, id, logo, optionsLg, para, subHeading, cardSpan = ''} = item
  const [defaultIndex, setDefaultIndex] = useState(0)
  const [selectedContent, setSelectedContent] = useState(optionsLg[0] ?? '')

  const changeFeature = useCallback(
    (index: number) => {
      setSelectedContent(optionsLg?.[index])
    },
    [optionsLg]
  )

  useEffect(() => {
    if (parentId) {
      setDefaultIndex(0)
    }
  }, [parentId])
  const getHeadingElementSize = useCallback(() => {
    if (!headingElement.current) return
    setCalculatedHeight(headingElement.current.clientHeight + 36)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    window.addEventListener('resize', getHeadingElementSize)

    return () => {
      window.removeEventListener('resize', getHeadingElementSize)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setTimeout(() => {
      getHeadingElementSize()
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDefaultIndex((index) => {
        if (index === optionsLg.length - 1) {
          changeFeature(0)
          return 0
        }
        changeFeature(index + 1)
        return index + 1
      })
    }, 5000)
    return () => clearInterval(intervalId)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsLg, defaultIndex])
  return (
    <div id={id} style={{scrollMarginBlock: 80}}>
      <div className="flex flex-col lg:justify-between gap-10 w-full">
        <div
          ref={headingElement}
          className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-[53px"
        >
          <div className="!w-full space-y-3 lg:space-y-1">
            <div className="flex items-center gap-3">
              <ImageComponent
                // className={className}
                imageUrl={logo}
              />
              <HeadingComponent
                className="!text-extra-dark-danger-color !font-bureau !leading-[38px] !font-[430]"
                singleLineContent={heading}
                type="h2"
                variant="medium"
              />
            </div>
            <DescriptionComponent
              className="!text-info-bg-color !text-2xl !leading-7 lg:!leading-8 !tracking-[-1px] font-[430] !font-bureau"
              singleLineContent={subHeading}
            />
          </div>
          <DescriptionComponent
            className="!text-base !text-landing-page-features-lg-less-opacity-gray opacity-[41%] !leading-5 !tracking-[-0.1px] !w-full"
            singleLineContent={para}
          />
        </div>

        <div className="flex gap-1.5">
          <div className="hidden lg:block space-y-2">
            {optionsLg?.map((feature, index) => (
              <div
                key={feature.heading}
                className={`relative text-xl tracking-[-0.5px] pb-16 pt-3 px-4 flex items-center justify-between w-[364px] ${index === defaultIndex && parentId === feature.parentId ? 'pointer-events-none  bg-primary-color   animating_line ' : 'cursor-pointer pointer-events-auto bg-inactive-color'}`}
                onClick={() => {
                  setDefaultIndex(index)
                  changeFeature(index)
                }}
              >
                <HeadingComponent
                  className="!text-primary-black !tracking-[-0.52px] !leading-[22px]"
                  singleLineContent={feature.heading}
                  type="h2"
                  variant="xxx-medium"
                />
                {index === defaultIndex && parentId === feature.parentId && (
                  <ListingComponent type="multi_list_type" />
                )}
              </div>
            ))}
          </div>

          <FeatureCard
            className="w-full min-h-[500px] max-h-hit h-full"
            featureCardHeading={selectedContent?.heading}
            featureCardImageUrl={selectedContent?.image}
            featureCardPara={selectedContent?.content}
            featureCardSpan={cardSpan}
            featureCardSubHeading={selectedContent?.subHeading}
            featureContainerHeading={selectedContent?.containerHeading}
          />
        </div>
      </div>
    </div>
  )
}

export default Feature
