import 'react-circular-progressbar/dist/styles.css'

import { memo, useMemo } from 'react'

import { English } from '@/helpers'
import { CircularProgressBarType } from '@/types/ComponentTypes'

const CircularProgressBarComponent = (props: CircularProgressBarType) => {
  const { className = '', GetChallengeByIdType } = props


  const totalAmount = useMemo(() => GetChallengeByIdType?.current_usdt, [GetChallengeByIdType])

  const realisedProfit = useMemo(
    () => GetChallengeByIdType?.released_profit,
    [GetChallengeByIdType?.released_profit]
  )

  return (
    <div className="relative mx-auto">
      <div className="flex flex-col w-full text-center  absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2">
        <span
          className="text-sm/6 text-widget-primary-text-color"
        >
          {English.E349}
        </span>
        {totalAmount && (
          <p
            className="text-lg  text-tertiary-color"
          >
            {(realisedProfit ?? 0.0).toFixed(2)} {English.E60}
          </p>
        )}
      </div>
      <div
        className={`h-[200px] w-[200px] rounded-full p-5 ${realisedProfit === null || !realisedProfit ? 'bg-info-bg-color' : realisedProfit > 0 ? 'bg-light-success-color!' : 'bg-light-danger-color!'} ${className}`}
      >
        <div className=" h-full w-full rounded-full bg-info-bg-color" />
      </div>
    </div>
  )
}

export default memo(CircularProgressBarComponent)
