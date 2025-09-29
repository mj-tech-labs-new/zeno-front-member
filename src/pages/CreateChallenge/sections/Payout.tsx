import {useMemo} from 'react'

import {CommonButton, Divider, HeadingComponent} from '@/components'
import {English} from '@/helpers'
import {ChallengePayoutObject} from '@/types/ChallengeTypes'
import {GeneralProps} from '@/types/CommonTypes'

const Payout = (
  props: ChallengePayoutObject & Required<Pick<GeneralProps, 'onPressItem'>>
) => {
  const {amount, capital, name, type, onPressItem} = props
  const payoutDetails = useMemo(() => {
    return {
      [English.E27]: type,
      [English.E36]: name,
      [English.E39]: capital,
    }
  }, [capital, name, type])

  const challengesArray = useMemo(() => {
    return [English.E43, English.E44, English.E45, English.E46]
  }, [])
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <HeadingComponent
          singleLineContent={English.E41}
          className="text-base/6 font-medium text-secondary-dark-color"
        />
        <h2
          className={`font-medium text-info-bg-color ${amount === '---' ? 'text-sm/5' : 'text-[32px] leading-6'}`}
        >
          {amount === '---' ? English.E48 : amount}
        </h2>
      </div>
      <Divider />
      <div className="flex flex-col gap-2">
        {Object.entries(payoutDetails)
          .filter(([_, value]) => !(amount !== '---' && value === '---'))
          .map(([key, value]) => (
            <div
              className="flex w-full items-center justify-between text-sm/6 font-medium gap-2"
              key={key}
            >
              <span className="text-text-info-color capitalize">{key}</span>
              <span
                className={`${
                  key === 'Trading Capital'
                    ? 'text-extra-dark-danger-color'
                    : 'text-text-info-dark-color'
                }`}
              >
                {value}
              </span>
            </div>
          ))}
      </div>
      <Divider />
      {amount !== '---' && (
        <div className="flex flex-col gap-2">
          <HeadingComponent
            className="!text-base/6 text-secondary-dark-color font-semibold"
            singleLineContent={English.E42}
          />
          <div className="flex flex-col gap-1">
            {challengesArray?.map((text) => {
              return (
                <p
                  key={text}
                  className="font-medium text-sm/6 text-dropdown-bg-color"
                >
                  {text}
                </p>
              )
            })}
          </div>
        </div>
      )}
      <CommonButton
        singleLineContent={English.E47}
        className={`${amount === '---' ? 'grey-disabled-btn-type pointer-events-none' : 'dark-danger-btn-type'} font-medium`}
        onClick={() => {
          onPressItem()
        }}
      />
    </div>
  )
}

export default Payout
