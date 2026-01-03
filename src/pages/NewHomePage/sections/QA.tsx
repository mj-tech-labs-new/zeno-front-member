import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import {useRef} from 'react'

import {ImageComponent} from '@/components'
import {Constants, Images} from '@/helpers'

const QA = () => {
  const divRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    const contentBox = gsap.utils.toArray('.content_box')
    contentBox?.forEach((box) => {
      gsap.to(box as any, {
        opacity: 1,
        x: 0,
        y: 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: box as any,
          start: 'bottom 95%',
          end: '+=20',
          scrub: 3,
        },
      })
    })
  }, [])

  return (
    <div
      ref={divRef}
      className="flex flex-col gap-5 max-w-full px-5 lg:max-w-3xl mx-auto w-full pb-[150px]"
    >
      {Constants.Talks.map((talk, index) => {
        const {content} = talk
        const isEven = index % 2 === 0
        return (
          <div key={content} className="text-primary-color">
            <div
              className={`flex gap-2 opacity-0 content_box  max-w-3/4 translate-y-8 ${isEven ? 'float-left -translate-x-20 ' : 'float-right translate-x-20'}`}
            >
              <p
                className={
                  isEven
                    ? 'p-6 py-[13px] bg-light-gray-color rounded-full'
                    : 'border border-solid border-primary-color/15  p-6 rounded-[20px] rounded-tr-[6px]'
                }
              >
                {content}
              </p>
              {!isEven && (
                <ImageComponent
                  className="size-9 bg-light-danger-color flex items-center justify-center rounded-full [&>img]:white_filter [&>img]:size-2.5 shrink-0"
                  imageUrl={Images.platformLogo}
                />
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default QA
