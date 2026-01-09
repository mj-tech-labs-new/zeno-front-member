// import {useGSAP} from '@gsap/react'
// import gsap from 'gsap'
// import {ScrollSmoother} from 'gsap/all'
// import _ScrollTrigger, {ScrollTrigger} from 'gsap/ScrollTrigger'
import {useRef} from 'react'

import TradersCard from '@/components/Cards/TradersCard'
import {Constants} from '@/helpers'

// gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const Stacking = () => {
  const containerRef = useRef(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  // useGSAP(
  //   () => {
  //     const cards = gsap.utils.toArray('.card')

  //     cards.forEach((card, index) => {
  //       gsap.to(card as any, {
  //         scrollTrigger: {
  //           trigger: card as any,
  //           start: () => `top bottom-=100`,
  //           end: () => `top top+=40`,
  //           scrub: true,
  //           invalidateOnRefresh: true,
  //         },
  //         ease: 'none',
  //         endTrigger: containerRef.current,
  //         end: 'bottom top',
  //         scale: () => 1 - (cards.length - index) * 0.025,
  //       })
  //       ScrollTrigger.create({
  //         trigger: card as any,
  //         start: 'top top',
  //         pin: true,
  //         pinSpacing: false,
  //         endTrigger: containerRef.current,
  //         end: 'bottom top',
  //         id: 'pin',
  //         invalidateOnRefresh: true,
  //       })
  //     })
  //   },
  //   {scope: containerRef}
  // )

  return (
    <div ref={wrapperRef} className="">
      <div ref={containerRef} className="flex flex-col gap-8">
        {Constants.StackingCard.map((item) => (
          <TradersCard {...item} key={item.description} />
        ))}
      </div>
    </div>
  )
}

export default Stacking
