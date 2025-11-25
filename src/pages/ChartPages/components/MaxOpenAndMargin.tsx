import {English} from '@/helpers'
import {MaxOpenAndMarginProps} from '@/types/ComponentTypes'

import {useChartProvider} from '../context/ChartProvider'

const MaxOpenAndMargin = (props: MaxOpenAndMarginProps) => {
  const {type = 'max_open', total} = props
  const {getChallengeByIdArray} = useChartProvider()

  return (
    <div className="font-normal">
      <div
        className={
          type === 'margin'
            ? 'block w-full space-y-4'
            : 'flex flex-row justify-between'
        }
      >
        {Array.from({length: 2}).map((_, index) => (
          <div
            key={index}
            className={`flex flex-col gap-1 ${type === 'margin' ? 'block w-full' : 'flex flex-col gap-2'}`}
          >
            {type === 'margin' && (
              <span className="text-base leading-[32px] mb-2 font-bold">
                {index === 0 ? English.E319 : English.E320}
              </span>
            )}
            <div
              className={`flex ${type === 'margin' ? 'flex-row justify-between items-center' : 'flex-col gap-1'}`}
            >
              <span className="text-chart-text-primary-color/40 text-sm leading-[20px]">
                {type === 'margin'
                  ? index === 0
                    ? English.E326
                    : English.E323
                  : English.E317}
              </span>
              <span className="font-medium">
                {getChallengeByIdArray?.[0]?.current_usdt.toFixed(2)}{' '}
                {English.E60}
              </span>
            </div>

            <div
              className={`flex ${type === 'margin' ? 'flex-row justify-between items-center' : 'flex-col gap-1'}`}
            >
              <span className="text-chart-text-primary-color/40 text-sm">
                {type === 'margin'
                  ? index === 0
                    ? English.E327
                    : English.E324
                  : English.E318}
              </span>
              <span className="font-medium">
                {type === 'margin' && index === 1
                  ? getChallengeByIdArray?.[0]?.current_usdt.toFixed(2)
                  : (total ?? 0)}{' '}
                {English.E60}
              </span>
            </div>

            {type === 'margin' && index === 1 && (
              <div
                className={`flex ${type === 'margin' ? 'flex-row justify-between items-start' : 'flex-col gap-1'}`}
              >
                <span className="text-chart-text-primary-color/40 text-sm">
                  {English.E325}
                </span>

                <div className="flex flex-col gap-1">
                  <span className="font-medium text-light-success-color">
                    {getChallengeByIdArray?.[0]?.current_usdt.toFixed(2)}{' '}
                    {English.E60}
                  </span>
                  <span className="font-medium text-light-danger-color">
                    {getChallengeByIdArray?.[0]?.current_usdt.toFixed(2)}{' '}
                    {English.E60}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MaxOpenAndMargin
