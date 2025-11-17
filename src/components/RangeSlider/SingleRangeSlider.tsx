import {memo, useMemo} from 'react'

import {RangeSliderProps} from '@/types/ComponentTypes'

const SingleRangeSlider = (props: RangeSliderProps) => {
  const {setValue, value} = props

  const minValue = useMemo(() => 0, [])
  const maxValue = useMemo(() => 100, [])
  const stepSize = useMemo(() => 1, [])

  return (
    <div className="range-slider-container">
      <input
        className="range-slider"
        max={maxValue}
        min={minValue}
        onChange={(e) => setValue(parseFloat(e.target.value))}
        step={stepSize}
        type="range"
        value={value}
      />
      <div className="slider-value">{value}</div>
    </div>
  )
}

export default memo(SingleRangeSlider)
