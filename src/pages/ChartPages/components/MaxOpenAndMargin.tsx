import {English} from '@/helpers'
import {MaxOpenAndMarginProps} from '@/types/ComponentTypes'

import {useChartProvider} from '../context/ChartProvider'

const MaxOpenAndMargin = (props: MaxOpenAndMarginProps) => {
  const {type = 'max_open', total} = props
  const {getChallengeByIdArray} = useChartProvider()

  return (
    <div>
      <div
        className={`border border-white ${type === 'margin' ? 'block w-full space-y-4' : 'flex 2xl:flex-col flex-row justify-between'}`}
      >
        {Array.from({length: 2}).map((_, index) => (
          <div
            key={index}
            className={`flex flex-col gap-1 ${type === 'margin' ? 'block w-full' : 'flex flex-col gap-1'}`}
          >
            <span className="text-chart-text-primary-color/40 text-sm">
              {English.E301}
            </span>
            <span className="font-normal">
              {getChallengeByIdArray?.[0]?.current_usdt} {English.E60}
            </span>
            <span className="text-chart-text-primary-color/40 text-sm">
              {English.E302}
            </span>
            <span className="font-normal">
              {total ?? 0} {English.E60}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MaxOpenAndMargin
