import {useCallback, useEffect, useMemo, useRef, useState} from 'react'

import {useModalContext} from '@/components/Modal/context/ModalContextProvider'
import {English, Images} from '@/helpers'
import RewardApi from '@/pages/Rewards/api/RewardApi'
import CongratulationModel from '@/pages/Rewards/Components/CongratulationModel'
import {AppLoaderRef} from '@/types/ComponentTypes'
import {RewardEarning, SocialMediaStatus} from '@/types/Rewards'

const useRewardCalculation = () => {
  const [earningData, setEarningData] = useState<RewardEarning | null>()
  const loaderRef = useRef<AppLoaderRef>(null)
  const [socialMediaCheck, setSocialMediaCheck] =
    useState<SocialMediaStatus | null>()

  const {setChildContent, setModalProps} = useModalContext()

  const handleFetchEarnings = useCallback(() => {
    loaderRef.current?.showLoader(true)
    RewardApi.RewardEarning()
      .then((res) => {
        if (res) {
          setEarningData(res?.data)
        }
      })
      .finally(() => {
        loaderRef.current?.showLoader(false)
      })
  }, [setEarningData])

  const handleModalRendering = useCallback(
    (pts: number) => {
      setModalProps({
        className:
          'w-[300px]  !rounded-2xl !bg-primary-color [&div>h2]:!text-primary-color [&<div<div]:!bg-primary-color  !py-5 !border !border-solid !border-tertiary-color',
        showCross: true,
        onPressButton() {
          setChildContent(null)
          setModalProps(null)
          handleFetchEarnings()
        },
      })
      setChildContent(
        <CongratulationModel
          point={pts ?? 0}
          onPressClose={() => {
            setModalProps(null)
            setChildContent(null)
            handleFetchEarnings()
          }}
        />
      )
    },
    [handleFetchEarnings, setChildContent, setModalProps]
  )

  const handleGetSocialMedia = useCallback(() => {
    loaderRef.current?.showLoader(true)
    RewardApi.SocialDataCheck()
      .then((res) => {
        if (res) {
          setSocialMediaCheck(res?.data)
        }
      })
      .finally(() => {
        loaderRef.current?.showLoader(false)
      })
  }, [])

  const handCheckSocialMediaReward = useCallback(
    (id: number) => {
      loaderRef.current?.showLoader(true)
      RewardApi.GetRewards({type: id})
        .then((res) => {
          if (res) {
            handleGetSocialMedia()
          }
        })
        .finally(() => {
          loaderRef.current?.showLoader(false)
        })
    },
    [handleGetSocialMedia]
  )

  const handUpdateCheckSocialMediaReward = useCallback(
    (id: number) => {
      loaderRef.current?.showLoader(true)
      RewardApi.UpdateRewards({type: id})
        .then((res) => {
          if (res) {
            handleModalRendering(res?.data?.earn_point)
            handleGetSocialMedia()
          }
        })
        .finally(() => {
          loaderRef.current?.showLoader(false)
        })
    },
    [handleGetSocialMedia, handleModalRendering]
  )

  const certificateTableData = useMemo(
    () => [
      {
        image: Images.zenoIcon,
        title: English.E467,
        registerDate: English.E460,
        taskLink: '',
        rewardStatus: socialMediaCheck?.registration_reward_status,
        reward: '10 Points',
        status: socialMediaCheck?.registration_status,
        type: 1,
        second: socialMediaCheck?.registration_reward_remain_sec,
      },
      {
        image: Images.twitterIcon,
        registerDate: English.E461,
        title: English.E467,
        taskLink: 'https://x.com/zeno_traders',
        rewardStatus: socialMediaCheck?.followed_X_reward_status,
        second: socialMediaCheck?.followed_X_reward_remain_sec,
        reward: '2 Points',
        status: socialMediaCheck?.followed_X_status,
        type: 3,
      },
      {
        image: Images.instagramIcon,
        title: English.E468,
        registerDate: English.E462,
        taskLink: 'https://www.instagram.com/zeno_trader',
        reward: '2 Points',
        rewardStatus: socialMediaCheck?.followed_instagram_reward_status,
        second: socialMediaCheck?.followed_instagram_reward_remain_sec,
        status: socialMediaCheck?.followed_instagram_status,
        type: 2,
      },
      {
        image: Images.telegramIcon,
        registerDate: English.E463,
        title: English.E468,
        taskLink: 'https://t.me/ZenoTraderChannel',
        reward: '2 Points',
        status: socialMediaCheck?.join_telegram_group_status,
        rewardStatus: socialMediaCheck?.join_telegram_group_reward_status,
        second: socialMediaCheck?.join_telegram_group_reward_remain_sec,
        type: 4,
      },
      {
        image: Images.telegramIcon,
        registerDate: English.E464,
        title: English.E468,
        taskLink: 'https://t.me/ZenoTraderCommunity',
        reward: '2 Points',
        status: socialMediaCheck?.join_telegram_community_status,
        rewardStatus: socialMediaCheck?.join_telegram_community_reward_status,
        second: socialMediaCheck?.join_telegram_community_reward_remain_sec,
        type: 5,
      },
      {
        image: Images.youtubeIcon,
        registerDate: English.E465,
        title: English.E469,
        taskLink: 'https://www.youtube.com/@Zeno_Trader',
        reward: '2 Points',
        status: socialMediaCheck?.subscribe_youtube_status,
        rewardStatus: socialMediaCheck?.subscribe_youtube_reward_status,
        second: socialMediaCheck?.subscribe_youtube_reward_remain_sec,
        type: 6,
      },
    ],
    [socialMediaCheck]
  )

  useEffect(() => {
    handleFetchEarnings()
    handleGetSocialMedia()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    earningData,
    handUpdateCheckSocialMediaReward,
    certificateTableData,
    handCheckSocialMediaReward,
    loaderRef,
  }
}

export default useRewardCalculation
