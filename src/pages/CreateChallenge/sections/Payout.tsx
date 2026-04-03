import {useMemo} from 'react'

import {
  CommonButton,
  Divider,
  HeadingComponent,
  ImageComponent,
} from '@/components'
import {English, Images, Utility} from '@/helpers'
import {ChallengePayoutObject} from '@/types/ChallengeTypes'

const Payout = (props: ChallengePayoutObject) => {
  const {amount, capital, name, type, plan_icon_url} = props
  const payoutDetails = useMemo(
    () => ({
      [English.E27]: type,
      [English.E36]: name ?? '----',
      [English.E39]: amount,
    }),
    [amount, name, type]
  )

  // const challengesArray = useMemo(
  //   () => [English.E43, English.E44, English.E45, English.E46],
  //   []
  // )

  return (
    <div
      className="flex flex-col gap-4 shrink-0  bg-primary-color p-6  rounded-[16px] sticky h-fit max-w-full  lg:w-full lg:max-w-[385px]"
      id="payout_id"
    >
      <div className="md:min-h-56 rounded-[8px] overflow-hidden">
        <ImageComponent
          className="size-full md:size-56 md:mx-auto lg:size-full "
          imageUrl={
            plan_icon_url === null
              ? Images.character1
              : `${import.meta.env.VITE_API_BASE_URL_PRODUCTION}${plan_icon_url?.replace('/home/ubuntu/backend-dev/', '')}`
          }
        />
      </div>
      <div className="flex flex-col gap-3">
        <HeadingComponent
          className="text-base/6 font-normal text-secondary-dark-color font-geist!"
          singleLineContent={English.E41}
        />

        <HeadingComponent
          className={`!font-medium !text-info-bg-color pb-2! !tracking-[-0.14px] ${amount === '---' ? '!text-sm/5' : '!text-[32px] !leading-6'}`}
          type="h2"
          singleLineContent={
            amount === '---'
              ? English.E48
              : `$${Utility.numberConversion(Number(capital ?? 0))}`
          }
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
                {key === 'Trading Capital'
                  ? `$${Utility.numberConversion(Number(value ?? 0))?.split('.')?.[0]} USDT`
                  : value}
              </span>
            </div>
          ))}
      </div>
      <CommonButton
        className={`${amount === '---' || amount === '0.00' ? 'grey-disabled-btn-type pointer-events-none' : 'dark-danger-btn-type'} font-normal rounded-[8px]!`}
        singleLineContent={English.E47}
        onClick={() => {
          // onPressItem()
        }}
      />
    </div>
  )
}

export default Payout
