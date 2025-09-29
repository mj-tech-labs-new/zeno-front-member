import {useMemo} from 'react'

import {Divider, ImageComponent, StatsDescription} from '@/components'
import {Constants, English, Images, Utility} from '@/helpers'
import ChallengeCardLayout from '@/layouts/ChallengeDashboardCardLayout'

const ChallengeDetailCard = () => {
  const number = useMemo(() => {
    const newNumber = Utility.numberConversion(10000)
    const splittedNumber = newNumber?.split('.')
    return {first: splittedNumber?.[0], second: splittedNumber?.[1]}
  }, [])
  return (
    <ChallengeCardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between w-full gap-3">
            <span className="text-text-hint-color text-15 !leading-6">
              Initial Capital
            </span>
            <div className="text-text-hint-color text-13 !leading-6 flex gap-0.5 items-center">
              {English.E117}: <span>w5qkdtx</span>{' '}
              <ImageComponent
                className="ml-1 !w-4 !h-4"
                imageUrl={Images.copy}
              />
            </div>
          </div>
          <div className="flex justify-between w-full gap-3x">
            <p className="text-tertiary-color text-xl/6 sm:text-2xl/6">
              {number?.first}.
              <span className="text-secondary-light-color">
                {number?.second}
              </span>{' '}
              {English.E60}
            </p>
            <p className="text-text-hint-color text-13 !leading-6">
              18 Sept 2025
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between gap-3">
          <StatsDescription
            headingContent={English.E68}
            infoContent="Content!!!"
            initialContent="500"
            secondContent="0"
            type="lossProgressType"
            subType="money"
            className="grey__filter"
          />
          <div className="w-[1px] min-h-full bg-info-bg-color" />
          <StatsDescription
            headingContent={English.E70}
            infoContent="Content!!!"
            initialContent="-1000"
            secondContent="0"
            type="lossProgressType"
            subType="money"
            className="grey__filter"
          />
        </div>

        <div className="space-y-5">
          {Object.entries(Constants.ConstantChallengeData)?.map(
            ([key, value]) => {
              return (
                <div
                  className="flex gap-4 text-13 !leading-6 items-center"
                  key={key}
                >
                  <span className="text-text-hint-color whitespace-nowrap">
                    {key}
                  </span>
                  <Divider className="!bg-info-bg-colof" />
                  <span
                    className={`text-tertiary-color ${key === 'Status' ? 'p-1 bg-light-success-color rounded-sm whitespace-nowrap' : ''}`}
                  >
                    {value}
                  </span>
                </div>
              )
            }
          )}
        </div>
      </div>
    </ChallengeCardLayout>
  )
}

export default ChallengeDetailCard
