import 'rc-slider/assets/index.css'

import Slider from 'rc-slider'
import {forwardRef, useMemo} from 'react'

import {RangeSelectorProps} from '@/types/ComponentTypes'

const RangeSelector = forwardRef<HTMLDivElement, RangeSelectorProps>(
  (props, ref) => {
    const {className = '', setRangeValue, rangeValue} = props
    const labels = useMemo(
      () => ({
        0: '0',
        25: '25',
        50: '50',
        75: '75',
        100: '100',
      }),
      []
    )

    return (
      <Slider
        ref={ref}
        activeDotStyle={{border: 'none'}}
        className={`w-[calc(100%-20px)]! mx-auto ${className}`}
        defaultValue={0}
        marks={labels}
        max={100}
        min={0}
        value={rangeValue}
        dotStyle={{
          width: 2,
          height: 6,
          borderRadius: 2,
          top: -1,
          background: '#777E90',
        }}
        onChange={(value) => {
          if (!value) {
            setRangeValue(0)
            return
          }
          setRangeValue(typeof value === 'number' ? value : value?.[0])
        }}
        styles={{
          rail: {backgroundColor: '#353945'},
          track: {backgroundColor: '#ffcc00'},
        }}
      />
    )
  }
)

export default RangeSelector
