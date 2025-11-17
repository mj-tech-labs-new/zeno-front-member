import {forwardRef, useCallback, useEffect, useRef} from 'react'

import {RangeSelectorProps} from '@/types/ComponentTypes'

const RangeSelector = forwardRef<HTMLDivElement, RangeSelectorProps>(
  (props, ref) => {
    const {
      className = '',
      rangeClassname = '',
      setRangeValue,
      rangeValue,
      sliderWidth = 300,
    } = props

    const isDrawingRange = useRef(false)
    const sliderRef = useRef<HTMLDivElement | null>(null)

    const updateValueFromPosition = useCallback(
      (clientX: number) => {
        const rect = sliderRef.current?.getBoundingClientRect()

        if (!rect) return
        const x = clientX - rect.left

        const newValue = Math.round((x / sliderWidth) * 100)
        setRangeValue(Math.min(100, Math.max(0, newValue)))
      },
      [setRangeValue, sliderWidth]
    )

    const handleMouseDown = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        isDrawingRange.current = true
        updateValueFromPosition(e.clientX)
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    )

    const handleMouseMove = useCallback((e: MouseEvent) => {
      if (isDrawingRange.current) updateValueFromPosition(e.clientX)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleMouseUp = () => {
      isDrawingRange.current = false
    }

    useEffect(() => {
      if (sliderRef.current) {
        sliderRef.current.style.width = `${sliderWidth}px`
      }
      if (isDrawingRange.current) {
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
      } else {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDrawingRange.current])

    const handlePosition = (rangeValue / 100) * sliderWidth

    return (
      <div
        className={`flex flex-col items-center relative select-none ${className}`}
      >
        <div
          ref={sliderRef ?? ref}
          className="absolute h-1 rounded-sm bg-gray-800 cursor-pointer"
          onMouseDown={handleMouseDown}
        >
          <div className="absolute left-0 h-full w-full flex justify-between ">
            {Array.from({length: 5}).map((_, index) => (
              <div
                key={`line_${index.toString()}`}
                className="block flex-col h-full items-center gap-7 justify-center"
              >
                <div className="w-1   h-full bg-neutral-primary-color" />
                <p className="text-white text-xs absolute mt-1.5">
                  {index * 25}
                </p>
              </div>
            ))}
          </div>
          <div
            className={`absolute  h-full rounded-sm bg-gray-500 ${rangeClassname} `}
            style={{width: `${handlePosition}px`}}
          />
          <div
            className="relative -top-[8px] bg-neutral-primary-color h-5 w-5 rounded-full flex items-center justify-center"
            style={{left: `${handlePosition - 8}px`}}
          >
            <div className=" w-3 h-3  rounded-full bg-primary-color cursor-grab" />
          </div>
        </div>
      </div>
    )
  }
)

export default RangeSelector
