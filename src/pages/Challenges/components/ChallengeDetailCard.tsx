import dayjs from 'dayjs'
import {useMemo} from 'react'
import {useNavigate} from 'react-router-dom'

import {
  CommonButton,
  Divider,
  ImageComponent,
  StatsDescription,
} from '@/components'
import {English, Images, Utility} from '@/helpers'
import ChallengeCardLayout from '@/layouts/ChallengeDashboardCardLayout'
import {ChallengeInfoDashboardProps} from '@/types/ChallengeTypes'

const ChallengeDetailCard = (props: {item: ChallengeInfoDashboardProps}) => {
  const {item} = props
  const navigate = useNavigate()
  const initialAmount = useMemo(() => {
    const firstNumber = Utility.numberConversion(item?.initial_capital ?? 0)
    const splittedNumber = firstNumber?.split('.')

    return {
      firstNumber: splittedNumber?.[0],
      secondNumber: splittedNumber?.[1],
    }
  }, [item?.initial_capital])

  const currentAmount = useMemo(() => {
    const firstNumber = Utility.numberConversion(item?.current_usdt ?? 0)
    const splittedNumber = firstNumber?.split('.')

    return {
      firstNumber: splittedNumber?.[0],
      secondNumber: splittedNumber?.[1],
    }
  }, [item?.current_usdt])

  const requiredItem = {
    Status: item?.status,
    'Current balance': `${currentAmount.firstNumber}.${currentAmount.secondNumber} USDT`,
    'Minimum Trading Days': `${item?.min_trading_day ?? '---'} Days`,
    Challenge: item?.challenge_type,
    'Trading type': 'Futures',
    'Drawdown type': 'Trailing',
    'Challenge type': 'Zeno Challenger',
  }

  return (
    <ChallengeCardLayout>
      <div className="flex flex-col gap-8">
        <div className="space-y-6">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between w-full gap-3">
              <span className="text-text-hint-color text-15 !leading-6">
                {English.E59}
              </span>
              <div className="text-text-hint-color text-13 !leading-6 flex gap-0.5 items-center">
                {English.E117}: <span>{item?.challenge_id}</span>{' '}
                <ImageComponent
                  className="ml-1 !w-4 !h-4 !cursor-pointer"
                  imageRelatedText={item?.challenge_id}
                  imageUrl={Images.copy}
                />
              </div>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-tertiary-color text-xl/6 sm:text-2xl/6">
                {initialAmount?.firstNumber}.
                <span className="text-secondary-light-color">
                  {initialAmount?.secondNumber}
                </span>{' '}
                {English.E60}
              </p>
              <p className="text-text-hint-color text-13 !leading-6">
                Started On:{' '}
                {dayjs(item?.created_at).format('D MMMM YYYY').toString()}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between gap-3 bg-tertiary-bg-color p-4 rounded-lg">
            <StatsDescription
              className="grey__filter"
              headingContent={English.E68}
              infoContent="Content!!!"
              initialContent={500}
              secondContent={0}
              type="lossProgressType"
            />
            <div className="w-[1px] min-h-full bg-landing-page-trading-rules-para-text" />
            <StatsDescription
              className="grey__filter"
              headingContent={English.E70}
              infoContent="Content!!!"
              initialContent={-1000}
              secondContent={0}
              type="lossProgressType"
            />
          </div>
        </div>
        <div className="space-y-5">
          {Object.entries(requiredItem)?.map(([key, value]) => (
            <div
              key={key}
              className="flex gap-4 text-13 !leading-6 items-center"
            >
              <span className="text-text-hint-color whitespace-nowrap">
                {key}
              </span>
              <Divider className="!bg-button-primary-color/50" />
              <span
                className={`text-tertiary-color whitespace-nowrap
                   ${
                     key === 'Status'
                       ? requiredItem.Status === 'Failed'
                         ? 'p-1 !bg-light-danger-color rounded-sm font-medium'
                         : 'p-1 !bg-light-success-color rounded-sm font-medium'
                       : ''
                   }`}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full flex gap-2 items-center">
          {[English.E56, English.E57].map((button, index) => (
            <CommonButton
              key={button}
              className={`${index === 0 ? 'primary-btn-type' : 'secondary-btn-type'} !py-2 [&>div]:!size-4`}
              imageUrl={`${index === 1 && Images.showDetailsGraphIcon}`}
              singleLineContent={button}
              onClick={() => {
                if (index === 0) {
                  navigate('/chart', {state: item?.challenge_id})
                }
                if (index === 1) {
                  navigate('/challenge-dashboard', {state: item?.challenge_id})
                }
              }}
            />
          ))}
        </div>
      </div>
    </ChallengeCardLayout>
  )
}

export default ChallengeDetailCard
