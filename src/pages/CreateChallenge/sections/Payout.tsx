import {useMemo} from 'react'

import {
  CommonButton,
  Divider,
  HeadingComponent,
  ImageComponent,
} from '@/components'
import {English, Images} from '@/helpers'
import {ChallengePayoutObject} from '@/types/ChallengeTypes'

const Payout = (props: ChallengePayoutObject) => {
  const {amount, capital, name, type} = props
  const payoutDetails = useMemo(
    () => ({
      [English.E27]: type,
      [English.E36]: name,
      [English.E39]: amount,
    }),
    [amount, name, type]
  )

  // const challengesArray = useMemo(
  //   () => [English.E43, English.E44, English.E45, English.E46],
  //   []
  // )

  return (
    <div className="flex flex-col gap-4 shrink-0  bg-primary-color p-6  rounded-[16px] sticky top-0 h-fit max-w-full  lg:w-fit lg:max-w-[385px]">
      <ImageComponent
        className="size-full md:size-56 md:mx-auto lg:size-full"
        imageUrl={Images.botIcon}
      />
      <div className="flex flex-col gap-4">
        <HeadingComponent
          className="text-base/6 font-medium text-secondary-dark-color font-geist!"
          singleLineContent={English.E41}
        />

        <HeadingComponent
          className={`!font-medium !text-info-bg-color !tracking-[-0.14px] ${amount === '---' ? '!text-sm/5' : '!text-[32px] !leading-6'}`}
          singleLineContent={amount === '---' ? English.E48 : `$${capital}`}
          type="h2"
        />
      </div>
      <Divider />
      <div className="flex flex-col gap-2">
        {Object.entries(payoutDetails)
          .filter(([_, value]) => !(amount !== '---' && value === '---'))
          .map(([key, value]) => (
            <div
              key={key}
              className="flex w-full items-center justify-between text-sm/6 font-medium gap-2"
            >
              <span className="text-text-info-color capitalize">{key}</span>
              <span
                className={
                  key === 'Trading Capital'
                    ? 'text-extra-dark-danger-color'
                    : 'text-text-info-dark-color'
                }
              >
                {key === 'Trading Capital' ? `$${value} USDT` : value}
              </span>
            </div>
          ))}
      </div>
      <CommonButton
        className={`${amount === '---' || amount === '0.00' ? 'grey-disabled-btn-type pointer-events-none' : 'dark-danger-btn-type'} font-medium rounded-[8px]!`}
        singleLineContent={English.E47}
        onClick={() => {
          // onPressItem()
        }}
      />
    </div>
  )
}

export default Payout
