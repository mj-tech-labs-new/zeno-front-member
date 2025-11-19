import {useEffect, useMemo, useState} from 'react'

import {ImageComponent} from '@/components'
import {Constants, Utility} from '@/helpers'
import Feature from '@/pages/HomePage/components/Feature'

const Features = () => {
  const [selectedFeature, setSelectedFeature] = useState(1)
  const [calculatedHeight, setCalculatedHeight] = useState(0)
  const sectionsToIdentify = useMemo(
    () => Constants.featuresObjectLg.map((item) => item.idToScroll),
    []
  )

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    sectionsToIdentify.forEach((section) => {
      const el = document.getElementById(section)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setSelectedFeature(
              section === 'challenge_container'
                ? 1
                : section === 'trade_track_container'
                  ? 2
                  : 3
            )
          }
        },
        {
          root: null,
          threshold: 0.3,
        }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observerElement) => observerElement.disconnect())
    }
  }, [sectionsToIdentify])

  return (
    <div className="pt-[54px] pb-[18px] lg:py-20 px-4 lg:px-13  block lg:flex lg:flex-row lg:gap-1.5">
      <div
        className="w-[213px] hidden lg:block sticky h-fit top-0"
        style={{paddingTop: `${calculatedHeight}px`}}
      >
        {Constants.featuresObjectLg.map((featureItem) => {
          const {content, id, logo, size, idToScroll} = featureItem
          return (
            <div
              key={id}
              className={`flex items-center py-1 gap-2.5 ${selectedFeature === id ? 'pointer-events-none' : 'pointer-events-auto cursor-pointer'}`}
              onClick={() => {
                setSelectedFeature(id)
                Utility.ScrollToSectionUtility(idToScroll)
              }}
            >
              <ImageComponent
                className={`${size} ${selectedFeature === id ? '' : 'grey__filter'}`}
                imageUrl={logo}
              />
              <span
                className={`text-sm/5 tracking-[-0.14px] font-bureau ${selectedFeature === id ? 'text-linear-gr-bg2-color' : 'text-landing-page-features-lg-less-opacity-gray/40'}`}
              >
                {content}
              </span>
            </div>
          )
        })}
      </div>
      <div className="flex-1">
        <div className="flex flex-col lg:gap-[200px] gap-14">
          {Constants.featuresWholeArray.map((feature) => (
            <Feature
              key={feature?.id}
              item={feature}
              parentId={selectedFeature}
              setCalculatedHeight={setCalculatedHeight}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features
