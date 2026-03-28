import {useCallback, useEffect, useRef, useState} from 'react'

import {useModalContext} from '@/components/Modal/context/ModalContextProvider'
import {English} from '@/helpers'
import {AppLoaderRef} from '@/types/ComponentTypes'
import {DailyBonusResponse} from '@/types/Rewards'

import RewardApi from '../api/RewardApi'
import CongratulationModel from '../Components/CongratulationModel'
import DailyBonusCard from '../Components/DailyBonusCard'
import DashboardSectionLayout from './DashboardSectionLayout'

const DailyLoginBonus = () => {
  const [dailyReward, setDailyReward] = useState<DailyBonusResponse | null>()

  const loaderRef = useRef<AppLoaderRef>(null)
  const {setModalProps, setChildContent} = useModalContext()

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

  const handleModalRendering = useCallback(
    (pts: number) => {
      setModalProps({
        className:
          'w-[300px]  !rounded-2xl !bg-primary-color [&div>h2]:!text-primary-color [&<div<div]:!bg-primary-color  !py-5 !border !border-solid !border-tertiary-color',
        showCross: true,
        onPressButton() {
          setChildContent(null)
          setModalProps(null)
        },
      })
      setChildContent(
        <CongratulationModel
          point={pts ?? 0}
          onPressClose={() => {
            setModalProps(null)
            setChildContent(null)
          }}
        />
      )
    },
    [setChildContent, setModalProps]
  )

  const handleGetDailyReward = useCallback(
    (id: number, points: string) => {
      loaderRef.current?.showLoader(true)

      RewardApi.GetDailyReward({id})
        .then((res) => {
          if (res) {
            handleCheckDailyReward()
            handleModalRendering(Number(points))
          }
        })
        .finally(() => {
          loaderRef.current?.showLoader(false)
        })
    },
    [handleCheckDailyReward, handleModalRendering]
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
        {Array.from({length: 28})?.map((__, index) => {
          const day = index + 1
          const content =
            day === 1
              ? `1 ${English.E490}`
              : day === 2
                ? `2 ${English.E490}`
                : day === 3
                  ? `3 ${English.E490}`
                  : day === 4
                    ? `4 ${English.E490}`
                    : day === 5
                      ? `5 ${English.E490}`
                      : day === 6
                        ? `6 ${English.E490}`
                        : day === 7
                          ? `10 ${English.E490}`
                          : day === 8
                            ? `11 ${English.E490}`
                            : day === 9
                              ? `12 ${English.E490}`
                              : day === 10
                                ? `13 ${English.E490}`
                                : day === 11
                                  ? `14 ${English.E490}`
                                  : day === 12
                                    ? `15 ${English.E490}`
                                    : day === 13
                                      ? `16 ${English.E490}`
                                      : day === 14
                                        ? `20 ${English.E490}`
                                        : day === 15
                                          ? `21 ${English.E490}`
                                          : day === 16
                                            ? `22 ${English.E490}`
                                            : day === 17
                                              ? `23 ${English.E490}`
                                              : day === 18
                                                ? `24 ${English.E490}`
                                                : day === 19
                                                  ? `25 ${English.E490}`
                                                  : day === 20
                                                    ? `26 ${English.E490}`
                                                    : day === 21
                                                      ? `30 ${English.E490}`
                                                      : day === 22
                                                        ? `31 ${English.E490}`
                                                        : day === 23
                                                          ? `32 ${English.E490}`
                                                          : day === 24
                                                            ? `33 ${English.E490}`
                                                            : day === 25
                                                              ? `34 ${English.E490}`
                                                              : day === 26
                                                                ? `35 ${English.E490}`
                                                                : day === 27
                                                                  ? `36 ${English.E490}`
                                                                  : `50 ${English.E490}`
          return (
            <DailyBonusCard
              key={index + 1}
              content={content}
              id={index + 1}
              infoContent={`Day-${index + 1}`}
              lastRewardDay={dailyReward?.lastRewardDay as number}
              nextRewardDay={dailyReward?.nextRewardDay as number}
              title={`Day ${index + 1}`}
              onPressItem={() => {
                handleGetDailyReward(index + 1, content?.replace(' Points', ''))
              }}
            />
          )
        })}
      </div>
    </DashboardSectionLayout>
  )
}

export default DailyLoginBonus
