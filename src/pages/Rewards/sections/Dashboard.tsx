import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {Link} from 'react-router-dom'

import {
  CommonButton,
  CommonTableComponent,
  ImageComponent,
  Loader,
} from '@/components'
import {Constants, English, Images} from '@/helpers'
import {AppLoaderRef} from '@/types/ComponentTypes'
import {RewardEarning, SocialMediaStatus} from '@/types/Rewards'

import RewardApi from '../api/RewardApi'
import CardSection from '../Components/CardSection'
import CertificateBarChart from '../Components/CertificateBarChart'
import CongratulationModel from '../Components/CongratulationModel'
import ReferralLinkSection from '../Components/ReferralLinkSection'

const Dashboard = () => {
  // const [DashboardData, setDashboardData] = useState()
  const loaderRef = useRef<AppLoaderRef>(null)
  const [earningData, setEarningData] = useState<RewardEarning | null>()
  const [socialMediaCheck, setSocialMediaCheck] =
    useState<SocialMediaStatus | null>()
  const [isModelOpen, setIsModelOpen] = useState(false)
  const [points, setPoints] = useState<{earn_point: number}>()

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
  }, [])

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
            setPoints(res?.data)
            setIsModelOpen(true)
            handleGetSocialMedia()
          }
        })
        .finally(() => {
          loaderRef.current?.showLoader(false)
        })
    },
    [handleGetSocialMedia]
  )

  const certificateTableData = useMemo(
    () => [
      {
        image: Images.zenoIcon,
        title: English.E467,
        registerDate: English.E460,
        taskLink: '',
        reward: '10 Points',
        status: socialMediaCheck?.registration_status,
        type: 1,
        time: socialMediaCheck?.registration_date,
      },
      {
        image: Images.twitterIcon,
        registerDate: English.E461,
        title: English.E467,
        taskLink: 'https://x.com/zeno_traders',
        reward: '2 Points',
        status: socialMediaCheck?.followed_X_status,
        type: 3,
        time: socialMediaCheck?.followed_X_date,
      },
      {
        image: Images.instagramIcon,
        title: English.E468,
        registerDate: English.E462,
        taskLink: 'https://www.instagram.com/zeno_trader',
        reward: '2 Points',
        status: socialMediaCheck?.followed_instagram_status,
        type: 2,
        time: socialMediaCheck?.followed_instagram_date,
      },
      {
        image: Images.telegramIcon,
        registerDate: English.E463,
        title: English.E468,
        taskLink: 'https://t.me/ZenoTraderChannel',
        reward: '2 Points',
        status: socialMediaCheck?.join_telegram_group_status,
        type: 4,
        time: socialMediaCheck?.join_telegram_group_date,
      },
      {
        image: Images.telegramIcon,
        registerDate: English.E464,
        title: English.E468,
        taskLink: 'https://t.me/ZenoTraderCommunity',
        reward: '2 Points',
        status: socialMediaCheck?.join_telegram_community_status,
        type: 5,
        time: socialMediaCheck?.join_telegram_community_date,
      },
      {
        image: Images.youtubeIcon,
        registerDate: English.E465,
        title: English.E469,
        taskLink: 'https://www.youtube.com/@Zeno_Trader',
        reward: '2 Points',
        status: socialMediaCheck?.subscribe_youtube_status,
        type: 6,
        time: socialMediaCheck?.subscribe_youtube_date,
      },
    ],
    [socialMediaCheck]
  )

  useEffect(() => {
    handleFetchEarnings()
    handleGetSocialMedia()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="flex flex-col gap-8 ">
      <Loader ref={loaderRef} />

      <CardSection earnings={earningData as RewardEarning} />

      <ReferralLinkSection />
      <CongratulationModel
        isModelOpen={isModelOpen}
        point={points?.earn_point as unknown as any}
        setIsModelOpen={(value) => {
          setIsModelOpen(value)
          handleFetchEarnings()
        }}
      />

      <CommonTableComponent
        className="h-full! "
        layoutClassName="h-full! [&>table]:overflow-y-visible!"
        tableHeading={Constants.certificateDashboardHeading}
      >
        {certificateTableData?.map((item, index) => {
          const {
            image,
            registerDate,
            reward,
            status,
            type,
            title,
            taskLink,
            time,
          } = item

          const d1 = new Date(socialMediaCheck?.server_time ?? '')
          let isShowOpen = false

          if (Number(time) === 0) {
            isShowOpen = false
          } else {
            const d2 = new Date(`${time?.replace(' ', 'T')}`)
            const diff = Number(d1?.getMinutes()) - Number(d2?.getMinutes())
            if (diff >= 1) {
              isShowOpen = true
            }
          }
          if (index === 0) {
            isShowOpen = true
          }
          const taken = status === 'taken'
          const granted = status === 'not_granted'
          const pending = status === 'pending'

          return (
            <tr
              key={`content-${index + 1}`}
              className="font-normal text-sm/6 *:transition-all *:duration-300 *:ease-in-out"
            >
              <th
                className="p-6 font-medium text-primary-color whitespace-nowrap "
                scope="row"
              >
                <ImageComponent className="w-6" imageUrl={image} />
              </th>
              <td className="p-6 text-primary-color capitalize">
                {registerDate}
              </td>
              <td className="p-6 text-primary-color capitalize ">
                {(taken || pending) && isShowOpen && (
                  <span className="flex gap-3">
                    <ImageComponent
                      className="w-5"
                      imageUrl={Images.greenDoneIcon}
                    />
                    <span>{English.E495}</span>
                  </span>
                )}
                {(pending || granted) && !isShowOpen && (
                  <Link
                    target="_blank"
                    to={taskLink}
                    onClick={() => {
                      if (isShowOpen) return
                      handCheckSocialMediaReward(type)
                    }}
                  >
                    <CommonButton
                      className="px-2! py-3! red_btn_utility w-full sm:max-w-56! "
                      singleLineContent={title}
                    />
                  </Link>
                )}
              </td>
              <td className="p-6 text-primary-color capitalize">{reward}</td>
              <td className="p-6 text-primary-color capitalize">
                <CommonButton
                  className={`px-2! py-3! ${pending ? 'text-primary-color! medium-success-btn-type ' : 'text-text-hint-color! primary-btn-type'} w-full sm:max-w-56! `}
                  disabled={taken || !isShowOpen}
                  onClick={() => {
                    handUpdateCheckSocialMediaReward(type)
                  }}
                  singleLineContent={
                    status !== 'taken' || !isShowOpen
                      ? English.E470
                      : English.E498
                  }
                />
              </td>
            </tr>
          )
        })}
      </CommonTableComponent>
      <CertificateBarChart />
    </div>
  )
}

export default Dashboard
