import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {useRef} from 'react'

import {ImageComponent} from '@/components'
import {Images} from '@/helpers'

gsap.registerPlugin(ScrollTrigger)

const Stacking = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const ImagesArray = [
    Images.fullDashboard,
    Images.fundNWithdraw,
    Images.carouselImg,
    Images.realTimeDashboard,
  ]

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('.imgWrapper')

      gsap.set(cards, {
        opacity: 0,
        scale: 0.9,
        y: 200,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: 'top top',
          end: () => `+=${cards.length * window.innerHeight}`, // 👈 100vh per card
          scrub: 1.2,
        },
        defaults: {ease: 'power3.inOut'},
      })

      cards.forEach((card, i) => {
        tl.to(
          card,
          {
            opacity: 1,
            scale: 1,
            y: i * -18,
            rotate: i * -2,
            zIndex: i + 1,
            duration: 1,
          },
          i
        )
      })
    },
    {scope: containerRef}
  )

  return (
    <div ref={containerRef} className="relative h-[450px] w-full">
      {ImagesArray.map((item, index) => (
        <div
          key={index}
          className="absolute inset-0 flex items-center justify-center"
        >
          <ImageComponent className="size-64 imgWrapper" imageUrl={item} />
        </div>
      ))}
    </div>
  )
}

export default Stacking
