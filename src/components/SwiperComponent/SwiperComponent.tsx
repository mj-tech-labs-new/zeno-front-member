import 'swiper/swiper-bundle.css'

import {forwardRef, memo, useMemo} from 'react'
import {Autoplay, Mousewheel, Pagination} from 'swiper/modules'
import {Swiper, SwiperProps, SwiperRef} from 'swiper/react'

import {SwiperComponentProps} from '@/types/ComponentTypes'

const SwiperComponent = forwardRef<SwiperRef, SwiperComponentProps>(
  (props, ref) => {
    const {
      onSlideChange,
      isPaginationType = false,
      slidesPerView,
      spaceBetween,
      children,
      isMouseWheelType = false,
      isAutoPlayType = false,
      className = '',
    } = props
    const modules = useMemo(() => {
      const totalModules: SwiperProps['modules'] = []
      if (isPaginationType) {
        totalModules.push(Pagination)
      }
      if (isMouseWheelType) {
        totalModules.push(Mousewheel)
      }
      if (isAutoPlayType) {
        totalModules.push(Autoplay)
      }
      return totalModules
    }, [isMouseWheelType, isPaginationType, isAutoPlayType])

    return (
      <Swiper
        ref={ref}
        className={`mySwiper ${className}`}
        direction="horizontal"
        modules={modules}
        onSlideChange={onSlideChange}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        mousewheel={{
          forceToAxis: isMouseWheelType,
          sensitivity: 1,
          releaseOnEdges: isMouseWheelType,
          enabled: true,
          eventsTarget: '.mySwiper',
        }}
        onReachEnd={() => {
          window.dispatchEvent(new WheelEvent('wheel', {deltaY: 1}))
        }}
        pagination={{
          clickable: isPaginationType,
        }}
      >
        {children}
      </Swiper>
    )
  }
)

export default memo(SwiperComponent)
