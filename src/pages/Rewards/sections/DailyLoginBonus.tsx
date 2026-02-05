import {useCallback, useEffect, useRef, useState} from 'react'

import {English} from '@/helpers'
import {AppLoaderRef} from '@/types/ComponentTypes'

import RewardApi from '../api/RewardApi'
import DailyBonusCard from '../Components/DailyBonusCard'
import DashboardSectionLayout from './DashboardSectionLayout'

const DailyLoginBonus = () => {
  const [dailyReward, setDailyReward] = useState<{
    lastRewardDay: number
  } | null>()

  const loaderRef = useRef<AppLoaderRef>(null)

  const handleCheckDailyReward = useCallback(() => {
    loaderRef.current?.showLoader(true)

    RewardApi.CheckDailyReward()
      .then((res) => {
        if (res) {
          setDailyReward(res?.data)
        }
      })
      .finally(() => {
        loaderRef.current?.showLoader(false)
      })
  }, [])

  const handleGetDailyReward = useCallback(
    (id: number) => {
      loaderRef.current?.showLoader(true)

      RewardApi.GetDailyReward({id})
        .then((res) => {
          if (res) {
            handleCheckDailyReward()
          }
        })
        .finally(() => {
          loaderRef.current?.showLoader(false)
        })
    },
    [handleCheckDailyReward]
  )

  useEffect(() => {
    handleCheckDailyReward()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <DashboardSectionLayout singleLineContent={English.E477}>
      <div
        className={`grid  grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 gap-2 md:gap-4 `}
      >
        {Array.from({length: 28})?.map((__, index) => (
          <DailyBonusCard
            key={index + 1}
            content={`${index + 1} Points`}
            id={index + 1}
            infoContent={`index${index + 1}`}
            showDisableValue={dailyReward?.lastRewardDay as number}
            title={`Day ${index + 1}`}
            onPressItem={() => {
              handleGetDailyReward(index + 1)
            }}
          />
        ))}
      </div>
    </DashboardSectionLayout>
  )
}

export default DailyLoginBonus
